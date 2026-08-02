const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const { buildPosterModel } = require('../components/PosterGenerator/PosterModel.ts');
const { getRowsForSport } = require('../lib/database/workbook.ts');
const { defaultExportSettings } = require('../lib/export/ExportSettings.ts');
const { renderPosterSvg } = require('../lib/export/renderPosterSvg.ts');

const cases = [
  ['Formula 1', 'Circuit de Monaco'],
  ['Football', 'Santiago Bernabéu'],
  ['Cricket', 'Eden Gardens'],
  ['Golf', 'Old Course at St Andrews'],
  ['Boxing', 'Madison Square Garden'],
];
const styles = ['collector', 'editorial', 'atlas'];
const outputDirectory = path.join(process.cwd(), '.next', 'visual-qa');
const tileWidth = 280;
const tileHeight = 385;
const columnGap = 24;
const rowHeight = 445;

function artworkResponse(href) {
  const filePath = path.join(process.cwd(), 'public', href.replace(/^\//, ''));
  return fs.existsSync(filePath)
    ? new Response(fs.readFileSync(filePath), { status: 200 })
    : new Response('', { status: 404 });
}

function labelSvg(venueName, style) {
  const escapedVenue = venueName.replace(/[&<>]/g, (value) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[value]);
  return Buffer.from(`<svg width="${tileWidth}" height="48"><text x="0" y="17" fill="#eee9df" font-family="Arial" font-size="13" font-weight="700">${escapedVenue}</text><text x="0" y="36" fill="#a9a39a" font-family="Arial" font-size="10" letter-spacing="2">${style.toUpperCase()}</text></svg>`);
}

async function main() {
  fs.mkdirSync(outputDirectory, { recursive: true });
  const originalFetch = global.fetch;
  global.fetch = async (href) => artworkResponse(String(href));
  try {
    const composites = [];
    for (const [rowIndex, [sport, venueName]] of cases.entries()) {
      const venue = (getRowsForSport(sport) || []).find((row) => row.venueName === venueName);
      if (!venue) throw new Error(`${venueName} is missing from the workbook.`);
      for (const [columnIndex, style] of styles.entries()) {
        const model = buildPosterModel(venue, style);
        const svg = await renderPosterSvg(model, defaultExportSettings);
        const png = await sharp(Buffer.from(svg)).resize(tileWidth, tileHeight).png().toBuffer();
        const slug = `${venueName}-${style}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        fs.writeFileSync(path.join(outputDirectory, `${slug}.png`), png);
        const left = columnIndex * (tileWidth + columnGap);
        const top = rowIndex * rowHeight;
        composites.push({ input: labelSvg(venueName, style), left, top });
        composites.push({ input: png, left, top: top + 48 });
      }
    }
    const width = styles.length * tileWidth + (styles.length - 1) * columnGap;
    const height = cases.length * rowHeight - 12;
    const outputPath = path.join(outputDirectory, 'isc-visual-matrix.png');
    await sharp({ create: { width, height, channels: 4, background: '#0d1014' } }).composite(composites).png().toFile(outputPath);
    console.log(outputPath);
  } finally {
    global.fetch = originalFetch;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
