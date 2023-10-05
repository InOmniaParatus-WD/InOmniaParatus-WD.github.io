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

// ------ FUNCTIONS TO MAKE THE CALCULATOR WORK ------

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
  //erases the result from the display when the user enters a new number following a completed previous calculation
  if (evaluatedExpression) {
    evaluatedExpression = "";
    numberOrOperator = evaluatedExpression;
    expression = "";
  }

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
    numberOrOperator.startsWith("0") &&
    numberOrOperator.length > 1 &&
    numberOrOperator[1] !== "."
  ) {
    numberOrOperator = numberOrOperator.replace("0", "");
  }
};
//The function allows the user to chose an operator and will replace the previously hit operator key. The operator dsiaplyed before the next integer is enatered will be the last operator key hit
const chooseOperator = (operatorKey) => {
  if (numberOrOperator === "") return;

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

//Delete the last entered number or digit
const deleteKey = () => {
  if (numberOrOperator === "") {
    expression = expression.slice(0, -1);
  }
  numberOrOperator = numberOrOperator.slice(0, -1);
};

//Evaluates the math expression when the "equals" key is hit and returns the result
//Uses Math.js library to avoid calculus errors with floating numbers

const calculate = () => {
  if (!isNaN(numberOrOperator)) {
    if (Number(numberOrOperator) < 0) {
      numberOrOperator = `(${numberOrOperator})`;
    }
  }
  expression += numberOrOperator;
  numberOrOperator = "";

  let result = math.evaluate(expression);

  evaluatedExpression = result.toLocaleString("en-US", {
    maximumFractionDigits: 2,
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
  calculate();
  updateDisplay();
});

clearDisplay.addEventListener("click", () => {
  numberOrOperator = "";
  expression = "";
  updateDisplay();
});

deleteLastKey.addEventListener("click", () => {
  deleteKey();
  updateDisplay();
});
// ---------- DOCUMENT EVENT LISTENERS FOR KEYBOARD USE ------------

document.addEventListener("keydown", (e) => {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const operators = ["+", "-", "/", "*"];
  //Add digits to the numer
  if (digits.includes(e.key)) {
    appendNumber(e.key);
    updateDisplay();
    console.log(e.key, "Number Key");
  }
  //Choose the operator
  if (operators.includes(e.key)) {
    chooseOperator(e.key);
    updateDisplay();
    console.log(e.key, "Operator Key");
  }
  //Calculate
  if (e.key === "=" || e.key === "Enter") {
    calculate();
    updateDisplay();
    console.log(e.key, "Equal/Enter");
  }
  //Delete the last entered key
  if (e.key === "Backspace") {
    deleteKey();
    updateDisplay();
    console.log("delete last key");
  }
  //Clear display
  if (e.key === "Delete") {
    numberOrOperator = "";
    expression = "";
    updateDisplay();
    console.log("clear the display");
  }
});
//Negate number
document.addEventListener("keypress", (e) => {
  if (!isNaN(numberOrOperator) && e.key === "_") {
    makeNumberNegative();
    updateDisplay();
  }
  console.log(e.key);
});

// //MathJS example of evaluating a string expression
let str = "2*3-4/5+22*54";
console.log(str + " = " + math.evaluate(str));

// Pop-up to let the user know they can install the app
let promptUser;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  promptUser = e;
  // Update the install UI to notify the user app can be installed
  document.querySelector('#install_button').style.display = 'block';
});

document.querySelector('#install_button').addEventListener('click', (e) => {
  // Hide the install button
  document.querySelector('#install_button').style.display = 'none';
  // Show the install prompt
  promptUser.prompt();
  // Wait for the user to respond to the prompt
  promptUser.userChoice.then((res) => {
    if (res.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  });
});
