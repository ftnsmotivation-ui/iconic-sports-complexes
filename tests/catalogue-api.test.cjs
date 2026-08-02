const test = require('node:test');
const assert = require('node:assert/strict');

const sportsRoute = require('../app/api/sports/route.ts');
const competitionsRoute = require('../app/api/competitions/route.ts');
const venuesRoute = require('../app/api/venues/route.ts');

test('catalogue APIs provide a navigable sport, competition, and venue chain', async () => {
  const sportsResponse = await sportsRoute.GET();
  const { sports } = await sportsResponse.json();
  assert.equal(sportsResponse.status, 200);
  assert.ok(Array.isArray(sports) && sports.length > 0);

  const sport = sports[0];
  const competitionsResponse = await competitionsRoute.GET(new Request(`http://localhost/api/competitions?sport=${encodeURIComponent(sport)}`));
  const { competitions } = await competitionsResponse.json();
  assert.equal(competitionsResponse.status, 200);
  assert.ok(Array.isArray(competitions) && competitions.length > 0);

  const venuesResponse = await venuesRoute.GET(new Request(`http://localhost/api/venues?sport=${encodeURIComponent(sport)}&competition=${encodeURIComponent(competitions[0])}`));
  const { venues } = await venuesResponse.json();
  assert.equal(venuesResponse.status, 200);
  assert.ok(Array.isArray(venues) && venues.length > 0);
  assert.equal(venues[0].competition, competitions[0]);
});

test('catalogue APIs reject incomplete requests', async () => {
  const response = await competitionsRoute.GET(new Request('http://localhost/api/competitions'));
  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /required/i);
});
