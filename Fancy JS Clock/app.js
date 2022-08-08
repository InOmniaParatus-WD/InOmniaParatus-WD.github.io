const hourEl = document.querySelector(".hours");
const minuteEl = document.querySelector(".minutes");
const secondEl = document.querySelector(".seconds");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");

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
const hours = time.getHours();
const minutes = time.getMinutes();
const seconds = time.getSeconds();
const ampm = hours >= 12 ? "PM" : "AM";

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

  timeEl.innerHTML = `${hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${ampm}`; 

  dateEl.innerHTML = `${days[day]}, ${months[month]} <span>${date}</span>`;
}

setTime();
setInterval(setTime, 1000);