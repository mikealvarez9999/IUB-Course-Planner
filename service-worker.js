/* IUB Course Planner - PWA Service Worker */
const CACHE_NAME = 'iub-course-planner-v4'; // bump this when deploying updates

// Core files to precache (add more if needed)
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.webmanifest',
  './data/courses.json'
];

// Build absolute URLs relative to SW scope
const toURL = (path) => new URL(path, self.registration.scope).toString();

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS.map(toURL)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k))))
    ).then(() => self.clients.claim())
  );
});

// Avoid caching analytics and cross-origin requests we don't control
const isIgnored = (url) => /googletagmanager\.com|google-analytics\.com/.test(url);

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin GET
  if (req.method !== 'GET' || url.origin !== self.location.origin || isIgnored(url.href)) {
    return;
  }

  // App shell-style navigation requests: serve index.html
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match(toURL('./index.html')).then((cached) =>
        cached || fetch(req).then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(toURL('./index.html'), copy));
          return resp;
        }).catch(() => caches.match(toURL('./index.html')))
      )
    );
    return;
  }

  // Cache-first for static assets; stale-while-revalidate for updates
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchAndUpdate = fetch(req).then((resp) => {
        if (resp && resp.status === 200) {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        }
        return resp;
      }).catch(() => cached); // network failed -> return cached (if any)
      return cached || fetchAndUpdate;
    })
  );
});
