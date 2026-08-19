// Standard PWA Service Worker delegating to firebase-messaging-sw.js
importScripts("/firebase-messaging-sw.js");

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
