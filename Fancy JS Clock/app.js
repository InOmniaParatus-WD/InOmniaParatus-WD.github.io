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
  // const ticks = time.getTime();
  const ampm = hours >= 12 ? "PM" : "AM";

  timeEl.innerHTML = `${hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${ampm}`; // For the military hour format with 24:00 hrs use 'hours' instead of 'hoursForClock'

  dateEl.innerHTML = `${days[day]}, ${months[month]} <span>${date}</span>`;

  hourEl.style.transform = ` translate(-50%, -100%) rotate(${scale(hoursForClock,0,12,0,360)}deg)`;
  minuteEl.style.transform = ` translate(-50%, -100%) rotate(${scale(minutes,0,60,0,360)}deg)`;

  let s = seconds
  console.log(s)
  if (s == 0) {
    // to prevent angle from being negative, add a full circle's worth of seconds angle
    s += 60
    /*/ schedule angle reset to 0 
    setTimeout(() => {
      // use no transition
      secondEl.style.transition = `all 0s`
      // to reset angle of seconds needle to 0
      secondEl.style.transform = ` translate(-50%, -100%) rotate(0deg)`;    
      // but then schedule a call to reset transition to the nice one
      setTimeout(() => {
        // reset transition to the nice one
        secondEl.style.transition = `all 0.35s ease-in`
      }, 100)
    }, 350) //*/
  }
  // perform usual rotation
  secondEl.style.transform = ` translate(-50%, -100%) rotate(${s * 6}deg)`;
}

//https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, inMin, inMax, outMin, outMax) => {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

setTime();
setInterval(setTime, 1000);
