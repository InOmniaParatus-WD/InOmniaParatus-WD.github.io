const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const negativeNumbers = document.getElementById("negative");
const clearDisplay = document.getElementById("clear");
const deleteLastKey = document.getElementById("backspace");
const equals = document.getElementById("equals");
const displayedNumber = document.getElementById("output-value");
const displayedExpression = document.getElementById("history-value");

let numberOrOperator = "";
let expression = "";
let evaluatedExpression = "";

//Updates the calculator display
const updateDisplay = () => {
  if (numberOrOperator !== "" && "+-/*".includes(numberOrOperator)) {
    // pressed operator
    displayedNumber.innerText = numberOrOperator;
    displayedExpression.innerText = expression + numberOrOperator;
  } else {
    // number, deciml, negative
    displayedNumber.innerText = numberOrOperator;
    displayedExpression.innerText = expression;
  }
};
//Adds a new digit to the number displayed every time the user hits a digit key before choosing an operator
const appendNumber = (key) => {
  //prevents the user from adding more than one decimal dot
  if (key === "." && numberOrOperator.includes(".")) return;

  if ("+-/*".includes(numberOrOperator)) {
    // verifies if the previously hit key is an operator
    expression += numberOrOperator;
    numberOrOperator = key;
  } else {
    numberOrOperator += key;
  }
  //A number cannot begin with zero unless zero is immediately followed by a decimal
  if (
    !isNaN(numberOrOperator) &&
    numberOrOperator.length > 1 &&
    numberOrOperator.startsWith("0") &&
    numberOrOperator[1] !== "."
  ) {
    numberOrOperator = numberOrOperator.replace("0", "");
  }
};
// the function allows the user to chose an operator and will replace the previously hit operator key. The operator dsiaplyed before the next integer is enatered will be the last operator key hit
const chooseOperator = (operatorKey) => {
  if (evaluatedExpression) {
    evaluatedExpression = "";
    expression = numberOrOperator;
  } else if (!"+-/*".includes(numberOrOperator)) {
    if (!isNaN(numberOrOperator) && Number(numberOrOperator) < 0) {
      numberOrOperator = `(${numberOrOperator})`;
    }
    expression += numberOrOperator;
  }
  numberOrOperator = operatorKey;
};
//Turns the displayed number into a negative
const makeNumberNegative = () => {
  if ("+-/*".includes(numberOrOperator)) return;
  numberOrOperator = `${parseFloat(numberOrOperator) * -1}`;
};
//Evaluates the math expression when the "equals" key is hit and returns the result
const calculate = (expression) => {
  let result = math.evaluate(expression);
  evaluatedExpression = result.toLocaleString("en-US", {
    maximumFractionDigits: 4,
  });
  numberOrOperator = evaluatedExpression;
};

// ---------------------- EVENT HANDLERS FOR EACH BUTTON --------------------

numbers.forEach((button) =>
  button.addEventListener("click", (e) => {
    appendNumber(e.target.dataset.number);
    updateDisplay();
  })
);

operators.forEach((button) =>
  button.addEventListener("click", (e) => {
    chooseOperator(e.target.dataset.operator);
    updateDisplay();
  })
);

negativeNumbers.addEventListener("click", () => {
  makeNumberNegative();
  updateDisplay();
});

equals.addEventListener("click", () => {
  if (isNaN(numberOrOperator)) return;
  if (Number(numberOrOperator) < 0) {
    numberOrOperator = `(${numberOrOperator})`;
  }
  expression += numberOrOperator;
  numberOrOperator = "";

  calculate(expression);
  updateDisplay();
});

clearDisplay.addEventListener("click", () => {
  numberOrOperator = "";
  expression = "";
  updateDisplay();
});

deleteLastKey.addEventListener("click", () => {
  if (numberOrOperator === "") {
    expression = expression.slice(0, -1);
  }

  numberOrOperator = numberOrOperator.slice(0, -1);
  updateDisplay();
});

//MathJS example of evaluating a string expression
let str = "2*3-4/5+22*54";
console.log(str + " = " + math.evaluate(str));