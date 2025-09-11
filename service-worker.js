/* IUB Course Planner - PWA Service Worker (cache bump) */
const CACHE_NAME = 'iub-course-planner-v3'; // bumped so clients fetch the latest
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.webmanifest',
  './data/courses.json'
];

const toURL = (path) => new URL(path, self.registration.scope).toString();

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS.map(toURL)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k)))))
      .then(() => self.clients.claim())
  );
});

const isIgnored = (url) => /googletagmanager\.com|google-analytics\.com/.test(url);

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method !== 'GET' || url.origin !== self.location.origin || isIgnored(url.href)) return;

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

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchAndUpdate = fetch(req).then((resp) => {
        if (resp && resp.status === 200) {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        }
        return resp;
      }).catch(() => cached);
      return cached || fetchAndUpdate;
    })
  );
});
