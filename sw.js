importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

workbox.setConfig({ debug: true });

workbox.precaching.precacheAndRoute([
    { url: 'index.html', revision: null },
]);

// doesnt work because of the 206 stuff :(
const cacheName = 'last-man-standing-media-cache';
const cacheURLs = [
  'Mission Impossible Theme Song (Flute Cover).mp3',
  'Ba Dum Tss!.mp3',
  'Surprised (Sound Effects).mp3',
]
self.addEventListener('install', (event) => {
  const precache = async () => {
    const cache = await caches.open(cacheName);
    await Promise.all([
      ...cacheURLs.map(url => cache.add(url))
    ])
  };
  event.waitUntil(precache());
});
  

workbox.routing.registerRoute(
  ({url}) => url.pathname.endsWith('.mp3'),
  new workbox.strategies.CacheFirst({
    cacheName: 'last-man-standing-media-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 24 * 60 * 60 * 365,
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({statuses: [200]}),
      new workbox.rangeRequests.RangeRequestsPlugin(),
    ],
  })
);
