const musicContainer = document.querySelector("#music-container");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#stop");
const nextBtn = document.querySelector("#next");
const playlistBtn = document.querySelector("#show-playlist");
const shuffleBtn = document.querySelector("#shuffle");
const repeatBtn = document.querySelector("#repeat");
const buttonFont = playBtn.querySelector("i.fas");
const audio = document.querySelector("#audio");
const songProgress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const songTitle = document.querySelector("#title");
const cover = document.querySelector("#cover");
const playList = document.querySelector("#playlist");
const volume = document.querySelector("#volume-control");

// Keep track of song and song list order
let songIdx = 0;
let isPlaying = false;
let isShuffled = false;

// Song titles
const allSongs = [
  "Password Infinity - Evgeny Bardyuzha",
  "Ambient Classical Guitar - William King",
  "Leva Eternity - lemonmusicstudio",
  "Powerful Beat - penguinmusic",
  "Summer Walk - Olexy",
  "Inspiring Cinematic Ambient - Lexin Music",
  "Weeknds - DayFox",
  "Into the Night - Prazkhanal",
  "Lifelike - AlexiAction",
  "Slow Trap - Anton Vlaslov",
];

const songsCopy = JSON.parse(JSON.stringify(allSongs));

const allImages = ["headphones", "rock'n'roll", "key", "instruments"];

// Initially load song details into DOM
showSongsInPlaylist();

// Display all songs and their respective duration in the playlist
function showSongsInPlaylist() {
  let songDuration = "";
  let index = 0;
  let newAudio = document.createElement("audio");

  // to display the total time for each song
  newAudio.ondurationchange = () => {
    let song = allSongs[index];
    songDuration = sToTime(newAudio.duration);

    const songTitle = document.createElement("li");

    songTitle.innerHTML = `<span>${allSongs[index]}</span> <span>${songDuration}</span>`;
    songTitle.addEventListener("click", () => {
      playBtn.classList.add("active");
      loadSong(song);
      playSong();
    });

    playList.querySelector("ul").appendChild(songTitle);

    if (index++ < allSongs.length - 1) {
      newAudio.src = `music/${allSongs[index]}.mp3`;
    } else {
      loadSong(allSongs[songIdx]);
    }
  };

  newAudio.src = `music/${allSongs[index]}.mp3`;
}

// Load the song currently playing/to play
function loadSong(song) {
  songTitle.innerText = song;

  audio.src = `music/${song}.mp3`;
  cover.src = `images/${
    allImages[Math.floor(Math.random() * allImages.length)]
  }.jpg`;

  const songs = document.querySelectorAll("li");

  songs.forEach((s, i) => {
    if (s.firstChild.innerText === song) {
      s.classList.add("active");
    } else s.classList.remove("active");
  });
}

// Play song
function playSong() {
  musicContainer.classList.remove("pause");
  musicContainer.classList.add("play");

  buttonFont.classList.remove("fa-play");
  playBtn.title = "Pause";
  buttonFont.classList.add("fa-pause");

  audio.play();
}

// Pause the song
function pauseSong() {
  musicContainer.classList.remove("play");
  musicContainer.classList.add("pause");

  buttonFont.classList.add("fa-play");
  buttonFont.classList.remove("fa-pause");
  playBtn.title = "Play";

  audio.pause();
}

// Choose next song on the list
function prevSong() {
  songIdx--;
  if (songIdx < 0) {
    songIdx = allSongs.length - 1;
  }

  loadSong(allSongs[songIdx]);
  if (isShuffled) loadSong(songsCopy[songIdx]);

  if (isPlaying) {
    playSong();
  }
}
// Choose previous song on the list
function nextSong() {
  songIdx++;
  if (songIdx === allSongs.length) {
    songIdx = 0;
  }

  if (isShuffled) {
    loadSong(songsCopy[songIdx]);
  } else {
    loadSong(allSongs[songIdx]);
  }

  if (isPlaying) {
    playSong();
  }
}

// Update progress of the playing song
function sToTime(time) {
  return `${padZero(parseInt((time / 60) % 60))}:${padZero(
    parseInt(time % 60)
  )}`;
}

function padZero(val) {
  return val < 10 ? `0${val}` : val;
}

function updateProgress(evt) {
  const { duration, currentTime } = evt.target;
  const progressPercent = (currentTime / duration) * 100;
  songProgress.style.width = `${progressPercent}%`;

  document.querySelector(".time").innerHTML = sToTime(currentTime);
  // document.querySelectorAll(".totalDuration").innerText = sToTime(duration)
}

// Set progress bar
function setProgress(evt) {
  const width = progressContainer.clientWidth;

  const clickX = evt.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Stop playing the song
function stopPlaying() {
  isPlaying = false;

  audio.pause();
  audio.currentTime = 0;

  musicContainer.className = "music-container";

  buttonFont.classList.remove("fa-pause");
  buttonFont.classList.add("fa-play");
}

// Shuffle the list of songs (function found on stackoverflow)
function shuffle(array) {
  let currentIdx = array.length;
  let randomIdx = 0;

  // While there remain elements to shuffle.
  while (currentIdx !== 0) {
    // Pick a remaining element.
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx--;

    // And swap it with the current element.
    [array[currentIdx], array[randomIdx]] = [
      array[randomIdx],
      array[currentIdx],
    ];
  }
  return array;
}

// Controlling the background color for volume range input when range is increased
function handleInputChange(e) {
  let target = e.target;

  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

// ---------------- EVENTS ----------------- //
// Play/pause a song
playBtn.addEventListener("click", () => {
  playBtn.classList.add("active");

  if (isPlaying) {
    isPlaying = false;
    pauseSong();
  } else {
    isPlaying = true;
    playSong();
  }
});

// Adjust the volume and input background color
volume.addEventListener("change", handleInputChange);

volume.addEventListener("touchend", (e) => {
  audio.volume = e.target.value;
}); // for mobile web browser

volume.addEventListener("click", (e) => {
  audio.volume = e.target.value;
});

// Stop the player
stopBtn.addEventListener("click", () => {
  playBtn.classList.remove("active");
  stopPlaying();
});

// Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Display playlist
playlistBtn.addEventListener("click", () => {
  playList.classList.toggle("show");
  playlistBtn.classList.toggle("displayed");
});

// Shuffle the songs on the playlist
shuffleBtn.addEventListener("click", () => {
  shuffleBtn.classList.toggle("clicked");

  shuffle(songsCopy);

  if (shuffleBtn.classList.contains("clicked")) {
    isShuffled = true;
  } else {
    isShuffled = false;
  }

  if (isPlaying) playSong();
});

// Play the list on repeat
repeatBtn.addEventListener("click", () => {
  repeatBtn.classList.toggle("clicked");
  // Repeat 1 track as an alternative to repeating the entire lists??
});

// Click on prgress bar
progressContainer.addEventListener("click", setProgress);

// Time/song update
audio.addEventListener("timeupdate", (e) => updateProgress(e));

// Song ends
audio.addEventListener("ended", () => {
  if (songIdx < allSongs.length - 1) {
    nextSong();
  } else if (repeatBtn.classList.contains("clicked")) {
    if (songIdx === allSongs.length - 1) nextSong();
  } else {
    stopPlaying();
  }
});

// ------------ Further study -------------- //

// Upload local files in the playlist
// Drag and drop => move the player on a different spot on the browser page
