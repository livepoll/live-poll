const CACHE_NAME = 'static-cache';
const urlsToCache = [
  '.',
  'index.html',
  'styles.css',
  'assets/*'
];

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

workbox.routing.registerRoute(({request}) =>
  request.destination === 'image', new workbox.strategies.NetworkFirst()
);

self.addEventListener('push', function (event) {
  if (self.Notification && self.Notification.permission === 'granted') {
    if (event.data !== undefined && event.data !== null) {
      const data = event.data.json();
      // Send push notification to users system
      registration.showNotification(data.title, {
        body: data.message,
        tag: 'push-notification',
        icon: 'assets/icons/manifest-icon-192.png'
      });
    } else {
      console.log('Push notification data parsing failed.');
    }
  }
})

self.addEventListener('notificationclick', function (event) {
  const notification = event.notification;
  notification.close();
  if (clients.openWindow) {
    clients.openWindow('https://example.blog.com/2015/03/04/something-new.html');
  }
})

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetchAndCache(event.request);
      })
  );
});

function fetchAndCache(url) {
  return fetch(url)
    .then(function(response) {
      if (!response.ok) throw Error(response.statusText);
      return caches.open(CACHE_NAME)
        .then(function(cache) {
          cache.put(url, response.clone());
          return response;
        });
    })
    .catch(function(error) {
      console.log('Request failed:', error);
    });
}
