export class Calculator {
  constructor() {
    this.numberOrOperator = "";
    this.expression = "";
    this.evaluatedExpression = "";
  }

  getCurrentState() {
    if (
      this.numberOrOperator !== "" &&
      "+-/*".includes(this.numberOrOperator)
    ) {
      return [this.numberOrOperator,  this.expression + this.numberOrOperator];
    } else {
        
      return [this.numberOrOperator,  this.expression ];
    }
  }

  appendNumber(key) {
    if (this.evaluatedExpression) {
      this.evaluatedExpression = "";
      this.numberOrOperator = this.evaluatedExpression;
      this.expression = "";
    }

    if (key === "." && this.numberOrOperator.includes(".")) return;

    if ("+-/*".includes(this.numberOrOperator)) {
      this.expression += this.numberOrOperator;
      this.numberOrOperator = key;
    } else {
      this.numberOrOperator += key;
    }

    if (
      !isNaN(this.numberOrOperator) &&
      this.numberOrOperator.startsWith("0") &&
      this.numberOrOperator.length > 1 &&
      this.numberOrOperator[1] !== "."
    ) {
      this.numberOrOperator = this.numberOrOperator.replace("0", "");
    }
    console.log(key);
  }

  chooseOperator(key) {
    if (this.numberOrOperator === "") return;

    if (this.evaluatedExpression) {
      this.evaluatedExpression = "";
      this.expression = this.numberOrOperator;
    } else if (!"+-/*".includes(this.numberOrOperator)) {
      if (!isNaN(this.numberOrOperator) && Number(this.numberOrOperator) < 0) {
        this.numberOrOperator = `(${this.numberOrOperator})`;
      }
      this.expression += this.numberOrOperator;
    }
    this.numberOrOperator = key;
  }

  makeNumberNegative() {
    if ("+-/*".includes(this.numberOrOperator)) return;
    this.numberOrOperator = `${parseFloat(this.numberOrOperator) * -1}`;
  }

  delete() {
    if (this.numberOrOperator === "") {
      this.expression = this.expression.slice(0, -1);
    }
    this.numberOrOperator = this.numberOrOperator.slice(0, -1);
  }

  clear() {
    this.numberOrOperator = "";
    this.evaluatedExpression = "";
    this.expression = "";
  }

  calculate() {
    if (!isNaN(this.numberOrOperator)) {
      if (Number(this.numberOrOperator) < 0) {
        this.numberOrOperator = `(${this.numberOrOperator})`;
      }
    }
    this.expression += this.numberOrOperator;
    this.numberOrOperator = "";

    let result = math.evaluate(this.expression);

    this.evaluatedExpression = result.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
    this.numberOrOperator = this.evaluatedExpression;
  }
}
