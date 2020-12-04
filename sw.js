importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

workbox.setConfig({ debug: true });

workbox.precaching.precacheAndRoute([
    { url: 'index.html', revision: null },
    { url: '007 James Bond Theme.mp3', revision: null },
    { url: 'Ba Dum Tss!.mp3', revision: null },
    { url: 'Surprised (Sound Effects).mp3', revision: null },
], 
{
    // Ignore all URL parameters.
    ignoreURLParametersMatching: [/.*/]
});
  
workbox.routing.registerRoute(
  () => '/',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'last-man-standing-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 24 * 60 * 60 * 365,
      }),
    ],
  })
);