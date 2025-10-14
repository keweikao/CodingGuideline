// Basic service worker for PWA functionality.
// This is a placeholder and will be enhanced in a later task (T026).

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
});

self.addEventListener('fetch', (event) => {
  // For now, just fetch from the network.
  // Caching strategies will be added in task T026.
  event.respondWith(fetch(event.request));
});
