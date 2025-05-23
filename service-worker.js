// The 'install' event is triggered when the Service Worker is being installed.
// This is a good place to cache assets if needed.
self.addEventListener("install", () => {
  // Forces the waiting Service Worker to become the active one immediately.
  // Normally, the new Service Worker waits until the old one is no longer in use.
  self.skipWaiting();
});

// The 'fetch' event is triggered for every network request made by the page.
// You can intercept the request and respond with a custom response (e.g., from cache).
self.addEventListener("fetch", (event) => {
  // In this basic example, we simply forward the request to the network as-is.
  event.respondWith(fetch(event.request));
});