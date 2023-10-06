// PWA
const pocketCalculator = "Calculator";
const assets = ["index.html", "app.js", "styles.css"];

let promptUser;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  promptUser = e;
  // Update the install UI to notify the user app can be installed
  document.querySelector('#install').style.display = 'block';
});

document.querySelector('#install').addEventListener('click', (e) => {
  // Hide the install button
  document.querySelector('#install').style.display = 'none';
  // Show the install prompt
  promptUser.prompt();
  // Wait for the user to respond to the prompt
  promptUser.userChoice.then((res) => {
    if (res.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  });
});


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
