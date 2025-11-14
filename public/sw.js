const CACHE_NAME = 'compressorbr-v1';
const OFFLINE_URL = '/offline.html';
const CORE_MATCHERS = ['ffmpeg-core.js', 'ffmpeg-core.wasm', 'ffmpeg-core.worker.js'];
const PRECACHE = ['/', '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png', '/og.png', OFFLINE_URL];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
          return null;
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (CORE_MATCHERS.some((matcher) => url.href.includes(matcher))) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    cache.put(request, response.clone()).catch(() => {});
    return response;
  } catch (error) {
    console.warn('[CompressorBR][SW] cacheFirst fallback', error);
    // attempt a fresh request without interfering with cache if previous failed
    try {
      return await fetch(request.url, { mode: 'cors', credentials: 'omit' });
    } catch (secondaryError) {
      console.error('[CompressorBR][SW] cacheFirst network error', secondaryError);
      throw secondaryError;
    }
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request)
    .then((response) => {
      cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached || cache.match(OFFLINE_URL));
  return cached || fetchPromise;
}
