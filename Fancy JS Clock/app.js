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

//Changes the time and date displayed on the clock and the displays underneath it
function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hours = time.getHours();
  const hoursForClock = hours % 12; //12hrs instead of 24hrs time format
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hourEl.style.transform = ` translate(-50%, -100%) rotate(${scale(hoursForClock,0,11,0,359)}deg)`;
  minuteEl.style.transform = ` translate(-50%, -100%) rotate(${scale(minutes,0,59,0,360)}deg)`;
  secondEl.style.transform = ` translate(-50%, -100%) rotate(${scale(seconds,0,59,0,360)}deg)`;

  timeEl.innerHTML = `${hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${ampm}`; // For the non-military hour format with 24:00 hrs use 'hoursForClock''hours' instead of 

  dateEl.innerHTML = `${days[day]}, ${months[month]} <span>${date}</span>`;
}

//https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, inMin, inMax, outMin, outMax) => {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

setTime();
setInterval(setTime, 1000);
