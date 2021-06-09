/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

const CACHE_NAME = 'static-cache';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/assets/themes/light.css',
  '/assets/themes/dark.css',
  '/assets/icons/apple-icon-180.png',
  '/assets/icons/manifest-icon-192.png',
  '/assets/icons/manifest-icon-512.png',
  '/assets/images/drag_indicator.svg',
  '/assets/images/empty.svg',
  '/assets/images/logo-light.svg',
  '/assets/images/logo-dark.svg',
  '/assets/images/light/wave-bot.svg',
  '/assets/images/light/wave-mid.svg',
  '/assets/images/light/wave-top.svg',
  '/assets/images/dark/wave-bot.svg',
  '/assets/images/dark/wave-mid.svg',
  '/assets/images/dark/wave-top.svg'
];

self.addEventListener('push', function (event) {
  if (self.Notification && self.Notification.permission === 'granted') {
    if (event.data !== undefined && event.data !== null) {
      const data = event.data.json();
      // Send push notification to users system
      registration.showNotification(data.title, {
        body: data.message,
        tag: 'push-notification',
        icon: 'assets/icons/manifest-icon-512.png'
      });
    }
  }
});

self.addEventListener('notificationclick', function (event) {
  const notification = event.notification;
  notification.close();
  if (self.clients.openWindow) {
    self.clients.openWindow('https://www.live-poll.de/login');
  }
});

self.addEventListener('install', (event) => event.waitUntil(
  caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
));

self.addEventListener('fetch', (event) => event.respondWith(
  fetch(event.request).catch(() => caches.match(event.request))
));
