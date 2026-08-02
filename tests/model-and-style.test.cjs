const test = require('node:test');
const assert = require('node:assert/strict');

const { buildPosterModel } = require('../components/PosterGenerator/PosterModel.ts');
const { posterStyleProfiles, resolvePosterStyle } = require('../components/PosterGenerator/PosterStyleProfiles.ts');

const venue = {
  venueName: 'Test Arena',
  sport: 'Football',
  city: 'Example City',
  country: 'Example Country',
  opened: 1923,
  capacity: '81,044',
  competition: 'Test League',
};

test('poster model normalizes venue facts and defaults', () => {
  const model = buildPosterModel(venue);
  assert.equal(model.facts.opened, '1923');
  assert.equal(model.facts.capacity, '81,044');
  assert.equal(model.styleId, 'collector');
  assert.equal(model.collector.number, '012');
  assert.equal(model.identity.venueName, venue.venueName);
});

test('style resolver returns three distinct, typed profiles', () => {
  assert.deepEqual(Object.keys(posterStyleProfiles).sort(), ['atlas', 'collector', 'editorial']);
  assert.equal(resolvePosterStyle(undefined).id, 'collector');
  assert.notEqual(resolvePosterStyle('collector').background, resolvePosterStyle('editorial').background);
  assert.equal(resolvePosterStyle('atlas').showGrid, true);
});
