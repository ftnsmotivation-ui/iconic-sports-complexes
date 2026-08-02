const CACHE_NAME = 'isc-studio-offline-v2';
const CORE_ASSETS = [
  '/',
  '/studio-preview',
  '/api/sports',
  '/databases/iconic-venues.xlsx',
  '/venue-assets/eden-gardens/hero-night.svg',
  '/venue-assets/circuit-de-monaco/hero-night.svg',
  '/venue-assets/santiago-bernabeu/hero-night.svg',
  '/venue-assets/st-andrews/hero-links.svg',
  '/venue-assets/madison-square-garden/hero-night.svg',
];

async function cacheResponse(cache, url) {
  const response = await fetch(url);
  if (response.ok) await cache.put(url, response.clone());
  return response;
}

async function warmCatalogue(cache) {
  const sportsResponse = await cacheResponse(cache, '/api/sports');
  if (!sportsResponse.ok) return;
  const sportsData = await sportsResponse.json();
  for (const sport of sportsData.sports || []) {
    const competitionUrl = `/api/competitions?sport=${encodeURIComponent(sport)}`;
    const competitionResponse = await cacheResponse(cache, competitionUrl);
    if (!competitionResponse.ok) continue;
    const competitionData = await competitionResponse.json();
    for (const competition of competitionData.competitions || []) {
      await cacheResponse(cache, `/api/venues?sport=${encodeURIComponent(sport)}&competition=${encodeURIComponent(competition)}`);
    }
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(CORE_ASSETS.map((asset) => cacheResponse(cache, asset)));
    await warmCatalogue(cache).catch(() => undefined);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith('isc-studio-offline-') && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const cacheFirst = url.pathname.startsWith('/api/') || url.pathname.startsWith('/venue-assets/') || url.pathname.startsWith('/databases/') || url.pathname.startsWith('/_next/static/');
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (cacheFirst) {
      const cached = await cache.match(request);
      if (cached) return cached;
    }
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) return cached;
      if (request.mode === 'navigate') return (await cache.match('/studio-preview')) || (await cache.match('/'));
      throw error;
    }
  })());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'REFRESH_CATALOGUE') event.waitUntil(caches.open(CACHE_NAME).then(warmCatalogue));
});
