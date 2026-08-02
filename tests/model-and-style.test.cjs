const test = require('node:test');
const assert = require('node:assert/strict');

const { buildPosterModel } = require('../components/PosterGenerator/PosterModel.ts');
const { resolvePosterComposition } = require('../components/PosterGenerator/PosterCompositionDirector.ts');
const { resolvePosterConcept } = require('../components/PosterGenerator/PosterConceptDirector.ts');
const { resolvePosterColours } = require('../components/PosterGenerator/PosterColourDirector.ts');
const { resolvePosterLayout } = require('../components/PosterGenerator/PosterLayoutDirector.ts');
const { resolvePosterTypography } = require('../components/PosterGenerator/PosterTypographyDirector.ts');
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

const masterVenues = [
  ['Circuit de Monaco', 'Formula 1', 'speed-luxury'],
  ['Eden Gardens', 'Cricket', 'atmosphere-history'],
  ['All England Lawn Tennis Club', 'Tennis', 'tradition-discipline'],
  ['Augusta National Golf Club', 'Golf', 'tranquillity-perfection'],
  ['Santiago Bernabéu', 'Football', 'grandeur-modernity'],
];

function masterSource(venueName, sport) {
  return { ...venue, venueName, sport };
}

function systems(model) {
  const style = resolvePosterStyle(model.styleId);
  const concept = resolvePosterConcept(model.conceptId);
  const layout = resolvePosterLayout(model.styleId, model.direction, concept.layoutId);
  const composition = resolvePosterComposition(model, layout);
  return {
    composition,
    typography: resolvePosterTypography(model, layout, style, concept, composition),
    colours: resolvePosterColours(model, style, concept, composition),
  };
}

test('visual stories emerge from venue DNA for every benchmark venue', () => {
  for (const [venueName, sport, expectedStory] of masterVenues) {
    assert.equal(buildPosterModel(masterSource(venueName, sport)).story.archetype, expectedStory);
  }
});

test('variation keys are deterministic and produce a different composition', () => {
  for (const [venueName, sport] of masterVenues) {
    const primary = buildPosterModel(masterSource(venueName, sport), 'collector', undefined, undefined, 'monument', 'primary');
    const alternate = buildPosterModel(masterSource(venueName, sport), 'collector', undefined, undefined, 'monument', 'alternate');
    assert.notEqual(primary.variation.id, alternate.variation.id);
    assert.deepEqual(primary.variation, buildPosterModel(masterSource(venueName, sport)).variation);
    assert.notDeepEqual(systems(primary).composition, systems(alternate).composition);
  }
});

test('director output is complete and palette-led without manual venue overrides', () => {
  for (const [venueName, sport] of masterVenues) {
    const model = buildPosterModel(masterSource(venueName, sport));
    const { composition, typography, colours } = systems(model);
    assert.ok(['illustration', 'title', 'map'].includes(composition.dominantHero));
    assert.ok(typography.titleLines.length >= 1 && typography.titleLines.length <= 2);
    assert.ok(typography.titleLines.every((line) => line.fontSize > 0 && line.baselineOffset >= 0));
    assert.equal(colours.background, model.direction.colourPalette[0]);
    assert.equal(colours.palette.length, 6);
  }
});
