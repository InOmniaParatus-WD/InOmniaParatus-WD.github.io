const currencyContainer = document.querySelector(".container");

const currEl_one = document.querySelector("#currency-one");
const currEl_two = document.querySelector("#currency-two");

const amountOne = document.querySelector("#amount-one");
const amountTwo = document.querySelector("#amount-two");

const rateEl = document.querySelector("#rate");
const swapBtn = document.querySelector("#swap");

// Updates the amount entered to contain only numbers
function changeChars(input) {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

  let enteredAmount = input.target.value;
  let key = input.data;

  // Stops the users from entering more than one dot
  let dotSeen = false;
  enteredAmount = enteredAmount.replace(/\D/g, (char) => {
    if (char === "." && !dotSeen) {
      dotSeen = true;
      return ".";
    }
    return "";
  });

  // Deletes any entered char that isNaN
  if (!digits.includes(key)) {
    enteredAmount = enteredAmount.replace(key, "");
  }
  // Doesn't allow an entered number to begin with one or more zeros, except when the first zero is followed by dot.
  if (
    !isNaN(enteredAmount) &&
    enteredAmount.startsWith("0") &&
    enteredAmount.length > 1 &&
    enteredAmount[1] !== "."
  ) {
    enteredAmount = enteredAmount.replace("0", "");
  }
  input.target.value = enteredAmount;
}
// Cached the latest currency rate from the API
let cachedRates = {};

function getCurrencyRates(currency) {
  if (cachedRates.hasOwnProperty(currency)) {
    return cachedRates[currency];
  } else {
    return fetch(
      `https://v6.exchangerate-api.com/v6/cbe0c79dea978802cfac4f74/latest/${currency}`
    )
      .then(async (res) => {
        let dataFethced = (await res.json()).conversion_rates;
        cachedRates[currency] = dataFethced;
        return dataFethced;
      })
      .catch((err) => {
        currencyContainer.innerHTML = `
      <div class="network-error">
        <h2> Oops! Something went wrong <span>&#128533;<span> ... </h2>
        <p>Please check your network connection or your API requests limit</p>
      </div>
      `;
      });
  }
}

//Fetch echange rates and update the DOM
async function calculate(event) {
  const currencyOne = currEl_one.value;
  const currencyTwo = currEl_two.value;

  if (event && event.target === amountTwo) {
    const rate = (await getCurrencyRates(currencyTwo))[currencyOne];
    rateEl.innerText = `1 ${currencyTwo} = ${rate} ${currencyOne}`;

    amountOne.value = (amountTwo.value * rate).toFixed(2);
  } else {
    const rate = (await getCurrencyRates(currencyOne))[currencyTwo];
    rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

    amountTwo.value = (amountOne.value * rate).toFixed(2);
  }
}

swapBtn.addEventListener("click", () => {
  const temp = currEl_one.value;

  currEl_one.value = currEl_two.value;
  currEl_two.value = temp;
  calculate();
});

amountOne.addEventListener("input", changeChars);
amountTwo.addEventListener("input", changeChars);

amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);

currEl_one.addEventListener("change", calculate);
currEl_two.addEventListener("change", calculate);

getCurrencyRates("AUD").then((data) => {
  let currencies = Object.keys(data);
  // console.log(currencies)

  // Dynamically populates currEl_one select with currency options
  for (let i = 0; i < currencies.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${currencies[i]}`;

    currEl_one.appendChild(option);
  }
  // Dynamically populates currEl_teo select with currency options
  for (let i = 0; i < currencies.length; i++) {
    const option = document.createElement("option");

    if (currencies[i] === "EUR") option.selected = true;

    option.innerHTML = `${currencies[i]}`;

    currEl_two.appendChild(option);
  }
  calculate();
});
