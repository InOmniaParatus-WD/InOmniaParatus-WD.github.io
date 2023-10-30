class ExpensesTracker {
  constructor() {
    this.totalIncomeValue = 0;
    this.totalExpensesValue = 0;
    this.balanceValue = 0;
    this.nextTransactionId =
      array.length === 0 ? 1 : Math.max(array.map((tran) => tran.id)) + 1;

    this.localStorageTransaction =
      JSON.parse(localStorage).getItems("transactions");
    this.transactionsArr = localStorageTransaction || [];
  }

  errorMessage(input, message, isError) {
    const formControl = input.parentElement;
    const errMsg = formControl.querySelector("small");

    formControl.classList.add(`${isError ? "error" : "success"}`);
    formControl.classList.remove(`${isError ? "success" : "error"}`);

    errMsg.innerHTML = message;
  }
}
