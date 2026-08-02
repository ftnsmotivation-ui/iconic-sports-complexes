const { app, BrowserWindow, session } = require('electron');
const { spawn } = require('node:child_process');
const net = require('node:net');
const path = require('node:path');

let serverProcess;

function availablePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      server.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

function startNextServer(port, development) {
  const projectRoot = app.isPackaged ? path.join(process.resourcesPath, 'app') : path.resolve(__dirname, '..');
  if (development) {
    const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    serverProcess = spawn(npmCommand, ['run', 'dev', '--', '--hostname', '127.0.0.1', '--port', String(port)], { cwd: projectRoot, stdio: 'inherit', shell: false });
  } else {
    const standaloneRoot = path.join(projectRoot, '.next', 'standalone');
    serverProcess = spawn(process.execPath, [path.join(standaloneRoot, 'server.js')], {
      cwd: standaloneRoot,
      env: { ...process.env, ELECTRON_RUN_AS_NODE: '1', HOSTNAME: '127.0.0.1', PORT: String(port) },
      stdio: 'inherit',
      shell: false,
    });
  }
  serverProcess.once('exit', (code) => { if (code && !app.isQuitting) app.quit(); });
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(`${url}/api/sports`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('ISC Studio local server did not become ready.');
}

function createWindow(origin) {
  const window = new BrowserWindow({
    title: 'ISC Studio',
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: '#090b0e',
    show: false,
    webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true, webSecurity: true, devTools: !app.isPackaged },
  });
  window.once('ready-to-show', () => window.show());
  window.webContents.on('will-navigate', (event, target) => { if (!target.startsWith(origin)) event.preventDefault(); });
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  void window.loadURL(`${origin}/studio-preview`);
}

app.whenReady().then(async () => {
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  const port = await availablePort();
  const origin = `http://127.0.0.1:${port}`;
  startNextServer(port, process.argv.includes('--dev'));
  await waitForServer(origin);
  createWindow(origin);
}).catch((error) => { console.error(error); app.quit(); });

app.on('before-quit', () => { app.isQuitting = true; if (serverProcess && !serverProcess.killed) serverProcess.kill(); });
app.on('window-all-closed', () => app.quit());
