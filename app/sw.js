const CACHE = 'gcc2026-v20260603b';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/main.css?v=20260603b',
  './js/data.js?v=20260603b',
  './js/app.js?v=20260603b',
  './photo icon.jpg',
  './Elexus hotel.jpeg',
  './castle.jpg',
  './Kirenia_old port.jpg',
  './embankment.jpg',
  './abbatstvo.jpg',
  './northen Cyprus.jpg',
  './Northen Cyprus 2.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Only cache same-origin and GitHub Pages requests; pass through Supabase/CDN
  const url = new URL(e.request.url);
  const isAppResource = url.origin === location.origin ||
    url.hostname === 'o6594340-sys.github.io';

  if (!isAppResource) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
