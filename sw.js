/* IUB Course Planner Service Worker
   - Static assets: cache-first
   - Dataset (data/courses.json): network-first (with cache fallback) to keep data fresh
*/
const STATIC_CACHE = 'iub-static-v1';
const DATA_CACHE = 'iub-data-v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
  // Note: data/courses.json is handled via network-first in fetch handler
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names.map(n => {
        if (![STATIC_CACHE, DATA_CACHE].includes(n)) return caches.delete(n);
      })
    );
  })());
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET
  if (req.method !== 'GET') return;

  // Same-origin requests only
  const sameOrigin = url.origin === self.location.origin;

  // Network-first for dataset
  if (sameOrigin && url.pathname.endsWith('/data/courses.json')) {
    event.respondWith(networkFirst(req));
    return;
  }

  // Cache-first for same-origin static
  if (sameOrigin) {
    event.respondWith(cacheFirst(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(req, { ignoreSearch: true });
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (e) {
    return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

async function networkFirst(req) {
  const cache = await caches.open(DATA_CACHE);
  try {
    const fresh = await fetch(req, { cache: 'no-store' });
    if (fresh && fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    if (cached) return cached;
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  }
}
