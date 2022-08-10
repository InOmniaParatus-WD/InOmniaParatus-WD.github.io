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
  hourDiv.style.transform =`rotateZ(${i * 30}deg)`
   
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

const hours = time.getHours();
const minutes = time.getMinutes();
const seconds = time.getSeconds();
const ampm = hours >= 12 ? "PM" : "AM";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//Calculates the needles' rotation angles
let hoursPosition = (hours * 360) / 12 + (minutes * (360 / 60)) / 12;
let minutesPosition = (minutes * 360) / 60 + (seconds * (360 / 60)) / 60;
let secondsPosition = (seconds * 360) / 60;

//Changes the time and date displayed on the clock and the displays underneath it
function setTime() {
  secondsPosition = secondsPosition + 360 / 60;
  minutesPosition = minutesPosition + (1 / 60) * (360 / 60);
  hoursPosition = hoursPosition + 30 / 3600;

  hourEl.style.transform = `translate(-50%, -100%) rotate(${hoursPosition}deg`;
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${minutesPosition}deg`;
  secondEl.style.transform = `translate(-50%, -100%) rotate(${secondsPosition}deg`;

  timeEl.innerHTML = `${hours % 12} : ${(minutes < 10) ? `0${minutes}` : minutes} ${ampm}`;
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span>${date}</span>, ${year}`;
  zoneEl.innerHTML = `${timeZone}`;
}

setTime();
setInterval(setTime, 1000);