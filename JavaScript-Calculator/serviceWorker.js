// PWA
const pocketCalculator = "Calculator";
const assets = ["index.html", "app.js", "styles.css"];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(pocketCalculator).then((cache) => {
      cache.addAll(assets);
    })
  );
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
