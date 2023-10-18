const clock = "Expense Tracker";

const assets = [
  "index.html",
  "app.js",
  "style.css",
  "images/cat.png",
  "images/spider_on_web.png",
];


self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(clock).then((cache) => {
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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
