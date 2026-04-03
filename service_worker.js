const STATIC_CACHE   = 'tp2-static-v1';
const DYNAMIC_CACHE  = 'tp2-dynamic-v1';
const TEMP_DATA_URL  = '/ressources/data/latest-temps.json';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/ressources/pages/account.html',
  '/ressources/styles/style.css',
  '/ressources/scripts/main.js',
  '/ressources/scripts/temperature.js',
  '/ressources/scripts/history.js',
  '/ressources/scripts/tabs_manual.js',
  '/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return Promise.allSettled(
        PRECACHE_URLS.map(url =>
          cache.add(url).catch(err =>
            console.warn('[SW] Impossible de pré-cacher :', url, err)
          )
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const validCaches = [STATIC_CACHE, DYNAMIC_CACHE];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => !validCaches.includes(k))
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.pathname === TEMP_DATA_URL || url.pathname.endsWith('latest-temps.json')) {
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
    return;
  }

  if (url.pathname === '/' || url.pathname.endsWith('index.html')) {
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
    return;
  }

  event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CACHE_TEMP_DATA') {
    const { payload } = event.data;
    const response = new Response(JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    });
    caches.open(DYNAMIC_CACHE).then(cache => {
      cache.put(TEMP_DATA_URL, response);
    });
  }
});

async function cacheFirstStrategy(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    console.warn('[SW] Ressource non disponible hors ligne :', request.url);
    return offlineFallback(request);
  }
}

async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return offlineFallback(request);
  }
}

function offlineFallback(request) {
  if (request.destination === 'document') {
    return caches.match('/index.html');
  }
  if (request.destination === 'image') {
    return new Response('', { status: 200 });
  }
  return new Response(
    JSON.stringify({ error: 'Hors ligne — données non disponibles' }),
    { status: 503, headers: { 'Content-Type': 'application/json' } }
  );
}