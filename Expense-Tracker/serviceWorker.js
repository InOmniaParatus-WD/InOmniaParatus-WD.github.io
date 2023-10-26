const expenseTracker = "Expense Tracker";

const assets = [
  "index.html",
  "JS/script.js",
  "CSS/styles.css",
  "images/expense-tracker.png"
];


self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(expenseTracker).then((cache) => {
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
