const CACHE_NAME = 'gs-calc-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/Style.css',
  '/Script.js',
  '/Geek_Squad_logo_(new).svg'
];

// Install the service worker and cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Serve cached assets when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});