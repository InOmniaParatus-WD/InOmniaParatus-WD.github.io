// PWA
const pocketCalculator = "Calculator";
const assets = ["index.html", "app.js", "styles.css"];

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("sw.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(pocketCalculator).then((cache) => {
      cache.addAll(assets);
    })
  );
});


self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((res) => {
      return res || fetch(evt.request);
    })
  );
});
