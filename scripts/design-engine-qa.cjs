const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const { buildPosterModel } = require('../components/PosterGenerator/PosterModel.ts');
const { getRowsForSport } = require('../lib/database/workbook.ts');
const { defaultExportSettings } = require('../lib/export/ExportSettings.ts');
const { renderPosterSvg } = require('../lib/export/renderPosterSvg.ts');

const venues = [
  ['Formula 1', 'Circuit de Monaco'],
  ['Football', 'Santiago Bernabéu'],
  ['Cricket', 'Eden Gardens'],
  ['Tennis', 'All England Lawn Tennis Club'],
  ['Golf', 'Augusta National Golf Club'],
];
const editions = ['primary', 'alternate'];
const outputDirectory = path.join(process.cwd(), '.next', 'design-engine-qa');
const tileWidth = 320;
const tileHeight = 440;
const gap = 28;
const labelHeight = 54;
const rowHeight = tileHeight + labelHeight + gap;

function artworkResponse(href) {
  const filePath = path.join(process.cwd(), 'public', href.replace(/^\//, ''));
  return fs.existsSync(filePath) ? new Response(fs.readFileSync(filePath), { status: 200 }) : new Response('', { status: 404 });
}

function escapeXml(value) {
  return value.replace(/[&<>]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[character]);
}

function labelSvg(venueName, edition, model) {
  return Buffer.from(`<svg width="${tileWidth}" height="${labelHeight}"><text x="0" y="18" fill="#eee9df" font-family="Arial" font-size="13" font-weight="700">${escapeXml(venueName)}</text><text x="0" y="39" fill="#a9a39a" font-family="Arial" font-size="9" letter-spacing="1.4">${edition.toUpperCase()} · ${model.story.archetype.toUpperCase()} · ${model.variation.id.toUpperCase()}</text></svg>`);
}

async function main() {
  fs.mkdirSync(outputDirectory, { recursive: true });
  const originalFetch = global.fetch;
  global.fetch = async (href) => artworkResponse(String(href));
  try {
    const composites = [];
    for (const [rowIndex, [sport, venueName]] of venues.entries()) {
      const venue = (getRowsForSport(sport) || []).find((row) => row.venueName === venueName);
      if (!venue) throw new Error(`${venueName} is missing from the workbook.`);
      for (const [columnIndex, edition] of editions.entries()) {
        const model = buildPosterModel(venue, 'collector', undefined, undefined, 'monument', edition);
        const svg = await renderPosterSvg(model, defaultExportSettings);
        const png = await sharp(Buffer.from(svg)).resize(tileWidth, tileHeight).png().toBuffer();
        const left = columnIndex * (tileWidth + gap);
        const top = rowIndex * rowHeight;
        composites.push({ input: labelSvg(venueName, edition, model), left, top });
        composites.push({ input: png, left, top: top + labelHeight });
      }
    }
    const outputPath = path.join(outputDirectory, 'collector-variation-matrix.png');
    await sharp({ create: { width: editions.length * tileWidth + gap, height: venues.length * rowHeight - gap, channels: 4, background: '#0d1014' } }).composite(composites).png().toFile(outputPath);
    console.log(outputPath);
  } finally {
    global.fetch = originalFetch;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
