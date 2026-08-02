const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const standaloneRoot = path.join(projectRoot, '.next', 'standalone');
const serverEntry = path.join(standaloneRoot, 'server.js');

if (!fs.existsSync(serverEntry)) {
  throw new Error('Standalone build not found. Run npm run build before preparing the desktop shell.');
}

fs.cpSync(path.join(projectRoot, 'public'), path.join(standaloneRoot, 'public'), { recursive: true, force: true });
fs.cpSync(path.join(projectRoot, '.next', 'static'), path.join(standaloneRoot, '.next', 'static'), { recursive: true, force: true });
console.log('Desktop standalone assets prepared.');
