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
