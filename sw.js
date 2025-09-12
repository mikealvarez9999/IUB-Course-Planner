/* IUB Course Planner Service Worker 
   - Static assets: cache-first (bump STATIC_CACHE when shipping CSS/JS changes)
   - HTML navigations: network-first so index.html updates immediately
   - Dataset (data/courses.json): network-first to keep data fresh
*/
const SW_VERSION = '2025-09-11';
const STATIC_CACHE = 'iub-static-v30';   // bump this when you deploy new static assets
const DATA_CACHE = 'iub-data-v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
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

// Optional: allow page to trigger immediate activation if needed
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // 1) HTML navigations: network-first so new index.html propagates quickly
  const isHTMLNav = req.mode === 'navigate' ||
                    (req.headers.get('accept') || '').includes('text/html');

  if (sameOrigin && isHTMLNav) {
    event.respondWith(networkFirstHTML(req));
    return;
  }

  // 2) Dataset: network-first
  if (sameOrigin && url.pathname.endsWith('/data/courses.json')) {
    event.respondWith(networkFirstData(req));
    return;
  }

  // 3) Same-origin static: cache-first
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

async function networkFirstHTML(req) {
  const cache = await caches.open(STATIC_CACHE);
  try {
    const fresh = await fetch(req, { cache: 'no-store' });
    if (fresh && fresh.ok) cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req, { ignoreSearch: true });
    // Fallback to cached root if specific HTML not cached
    return cached || cache.match('./') || new Response('Offline', { status: 503 });
  }
}

async function networkFirstData(req) {
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
