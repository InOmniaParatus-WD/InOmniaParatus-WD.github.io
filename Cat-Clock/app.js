const hourEl = document.querySelector(".hours");
const minuteEl = document.querySelector(".minutes");
const secondEl = document.querySelector(".seconds");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const zoneEl = document.querySelector(".time-zone");

//Creates the hours elements on the side of the clock
for (let i = 1; i <= 12; i++) {
  const hoursRing = document.querySelector(".hour-dots");
  const hourDiv = document.createElement("div");

  hourDiv.innerHTML = `<span class="dot">${i}</span>`;
  hourDiv.style.transform = `rotateZ(${i * 30}deg)`;

  hoursRing.appendChild(hourDiv);
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesaday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const time = new Date();

const month = time.getMonth();
const date = time.getDate();
const day = time.getDay();
const year = time.getFullYear();

let hours = time.getHours();
let minutes = time.getMinutes();
let seconds = time.getSeconds();

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//Calculates the needles' rotation angles
let hoursAngle = (hours * 360) / 12 + (minutes * (360 / 60)) / 12;
let minutesAngle = (minutes * 360) / 60 + (seconds * (360 / 60)) / 60;
let secondsAngle = (seconds * 360) / 60;

//Changes the time and date displayed on the clock and the displays underneath it
function setTime() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  secondsAngle = secondsAngle + 360 / 60;
  minutesAngle = minutesAngle + (1 / 60) * (360 / 60);
  hoursAngle = hoursAngle + 30 / 360;

  hourEl.style.transform = `translate(-50%, -100%) rotate(${hoursAngle}deg`;
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${minutesAngle}deg`;
  secondEl.style.transform = `translate(-50%, -100%) rotate(${secondsAngle}deg`;

  let ampm = hours >= 12 ? "PM" : "AM";
  let hourDisplayed = hours % 12;
  let minutesDisplayed = minutes < 10 ? `0${minutes}` : minutes;

  timeEl.innerHTML = `${hourDisplayed === 0 ? hourDisplayed = 12 : hourDisplayed} : ${minutesDisplayed} ${ampm}`;
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span>${date}</span>, ${year}`;
  zoneEl.innerHTML = `${timeZone}`;
}

setTime();
setInterval(setTime, 1000);
