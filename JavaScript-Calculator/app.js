import { Calculator } from "./classCalculator.js";

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const negativeNumbers = document.getElementById("negative");
const clearDisplay = document.getElementById("clear");
const deleteLastKey = document.getElementById("backspace");
const equals = document.getElementById("equals");
const displayedNumber = document.getElementById("output-value");
const displayedExpression = document.getElementById("history-value");

const pocketCalculator = new Calculator();

const updateDisplay = () => {
  const [number, expression] = pocketCalculator.getCurrentState();
  displayedNumber.innerText = number;
  displayedExpression.innerText = expression;
};

// ------------ MOUSE EVENTS ------------- //
numbers.forEach((button) =>
  button.addEventListener("click", (e) => {
    pocketCalculator.appendNumber(e.target.dataset.number);
    updateDisplay();
  })
);

operators.forEach((button) =>
  button.addEventListener("click", (e) => {
    pocketCalculator.chooseOperator(e.target.dataset.operator);
    updateDisplay();
  })
);

negativeNumbers.addEventListener("click", () => {
  pocketCalculator.makeNumberNegative();
  updateDisplay();
});

equals.addEventListener("click", () => {
  pocketCalculator.calculate();
  updateDisplay();
});

clearDisplay.addEventListener("click", () => {
  pocketCalculator.clear();
  updateDisplay();
});

deleteLastKey.addEventListener("click", () => {
  pocketCalculator.delete();
  updateDisplay();
});

// ------------ KEYBOARD EVENTS ------------- //
document.addEventListener("keydown", (e) => {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const operators = ["+", "-", "/", "*"];
  //Add digits to the numer
  if (digits.includes(e.key)) {
    pocketCalculator.appendNumber(e.key);
    updateDisplay();
  }
  //Choose the operator
  if (operators.includes(e.key)) {
    pocketCalculator.chooseOperator(e.key);
    updateDisplay();
  }
  //Calculate
  if (e.key === "=" || e.key === "Enter") {
    pocketCalculator.calculate();
    updateDisplay();
  }
  //Delete the last entered key
  if (e.key === "Backspace") {
    pocketCalculator.delete();
    updateDisplay();
  }
  //Clear display
  if (e.key === "Delete") {
    pocketCalculator.clear();
    updateDisplay();
  }
});
//Negate number
document.addEventListener("keypress", (e) => {
  if (e.key === "_") {
    pocketCalculator.makeNumberNegative();
    updateDisplay();
  }
});

const modal = document.querySelector(".modal-container");
document.querySelector("#open-modal").addEventListener("click", () => {
  modal.classList.toggle("show");
});

document.querySelector("#close-modal").addEventListener("click", () => {
  modal.classList.toggle("show");
});
