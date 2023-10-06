const expenseTracker = "Expense Tracker";

const assets = [
  "index.html",
  "script.js",
  "css/styles.css",
  "css/modals-styles.css",
  "css/scroll-styles.css",
  "css/tooltip-styles.css",
  "images/expense-tracker.png"
];

// let promptUser;

// window.addEventListener("beforeinstallprompt", (e) => {
//   promptUser = e; 
//   document.querySelector("#install").style.display = "block";
// });

// document.querySelector("#install").addEventListener("click", (e) => {
//   promptUser.prompt();
//   promptUser.userChoice.then((res) => {
//     if (res.outcome === "accepted") {
//       console.log("User accepted the install prompt");
//     } else {
//       console.log("User dismissed the install prompt");
//     }
//   });
// });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

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
