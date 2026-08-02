const test = require('node:test');
const assert = require('node:assert/strict');

const { buildPosterModel } = require('../components/PosterGenerator/PosterModel.ts');
const { clearStudioDraft, loadStudioDraft, saveStudioDraft } = require('../components/Studio/StudioDraft.ts');
const { defaultExportSettings } = require('../lib/export/ExportSettings.ts');
const { SvgExportAdapter } = require('../lib/export/SvgExportAdapter.ts');

test('Studio draft survives a save, load, and reset smoke flow', () => {
  const values = new Map();
  global.window = { localStorage: { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) } };
  const draft = { version: 1, selectedSport: 'Cricket', selectedCompetition: 'Test', selectedVenueName: 'Test Ground', selectedStyle: 'atlas', selectedParameters: ['venueFacts'], personalisation: { enabled: false }, selectedConcept: 'survey', selectedFrame: 'oak' };
  saveStudioDraft(draft);
  assert.deepEqual(loadStudioDraft(), { ...draft, personalisation: { enabled: false, date: '', occasion: '', stand: '', seat: '', notes: '' } });
  clearStudioDraft();
  assert.equal(loadStudioDraft(), null);
  delete global.window;
});

test('SVG export produces a standalone vector master and safe filename', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => new Response('<svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10"/></svg>');
  try {
    const model = buildPosterModel({ venueName: 'Test & Arena', sport: 'Football', city: 'City', country: 'Country', opened: 2001, capacity: 50000 });
    const artifact = await new SvgExportAdapter().export({ model, settings: defaultExportSettings, filename: 'Test & Arena' });
    const svg = new TextDecoder().decode(artifact.bytes);
    assert.equal(artifact.filename, 'test-arena.svg');
    assert.equal(artifact.mimeType, 'image/svg+xml;charset=utf-8');
    assert.match(svg, /^<\?xml/);
    assert.match(svg, /viewBox="0 0 800 1100"/);
    assert.match(svg, /Test &amp; Arena/);
  } finally {
    global.fetch = originalFetch;
  }
});
