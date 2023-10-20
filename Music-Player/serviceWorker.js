const player = "Music Player";

const assets = [
  // app files
  "index.html",
  "script.js",
  "styles.css",
  // images
  "images/headphones.jpg",
  "images/instruments.jpg",
  "images/key.jpg",
  "images/rock'n'roll.jpg",
  // tracks
  "music/Ambient Classical Guitar - William King.mp3",
  "music/Inspiring Cinematic Ambient - Lexin Music.mp3",
  "music/Into the Night - Prazkhanal.mp3",
  "music/Leva Eternity - lemonmusicstudio.mp3",
  "music/Lifelike - AlexiAction.mp3",
  "music/Password Infinity - Evgeny Bardyuzha.mp3",
  "music/Powerful Beat - penguinmusic.mp3",
  "music/Slow Trap - Anton Vlaslov.mp3",
  "music/Summer Walk - Olexy.mp3",
  "music/Weeknds - DayFox.mp3",
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(player).then((cache) => {
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
