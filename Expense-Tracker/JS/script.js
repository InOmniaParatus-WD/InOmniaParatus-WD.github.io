// Add new transaction form elements
const balance = document.querySelector("#balance");
const totalIncome = document.querySelector("#income");
const totalExpenses = document.querySelector("#expenses");
const transactionName = document.querySelector("#transaction");
const transactionAmount = document.querySelector("#amount");
const quantity = document.querySelector("#number");
const transactionDate = document.querySelector("#transaction-date");
const transactionsList = document.querySelector("#list");
const form = document.querySelector("#form");

// Edit existing transaction form elements (modal)
const editItemModal = document.querySelector(".modal-container");
const editForm = document.querySelector("#modal-form");
const cancelChange = document.querySelector("#cancel-btn");
const editDate = document.querySelector("#edit-date");
const editName = document.querySelector("#edit-name");
const editAmount = document.querySelector("#edit-amount");
const editQuantity = document.querySelector("#edit-qty");

// Confirmation for deleting a transcaction (modal)
const deleteItemModal = document.querySelector(".undo-modal-container");
const confirmDelete = document.querySelector("#delete-btn");
const cancelDelete = document.querySelector("#cancel-delete-btn");

// Default value for date input
const fullDate = new Date();

const displayDate = `${fullDate.getFullYear()}-${
  fullDate.getMonth() + 1
}-${fullDate.getDate()}`;

transactionDate.setAttribute("value", `${displayDate}`);

// ---------------- FUNCTIONALITY ---------------- //

//Show Input Error Message
const showError = (input, message, isError) => {
  const formControl = input.parentElement;
  const errMsg = formControl.querySelector("small");

  formControl.classList.add(`${isError ? "error" : "success"}`);
  formControl.classList.remove(`${isError ? "success" : "error"}`);

  errMsg.innerHTML = message;
};

// Get items from localstorage
const localStorageTransaction = JSON.parse(
  localStorage.getItem("transactions")
);

// Save transactions added to the list
let allTransactions = localStorageTransaction || [];

let totalIncomeValue = 0;
let totalExpensesValue = 0;
let balanceValue = 0;
let nextTransactionId =
  allTransactions.length === 0
    ? 1
    : Math.max(allTransactions.map((tran) => tran.id)) + 1;

// Add new transaction to array
const newTransaction = (date, name, itemPrice, qty) => {
  let transaction = {
    id: nextTransactionId++,
    date,
    name,
    itemPrice: +itemPrice,
    qty: +qty,
  };
  allTransactions.push(transaction);
};

// User side validation
const validateInput = (dateEl, nameEl, amountEl, quantityEl) => {
  // validate quantity - can only be an integer from 1 upwards, no decimals accepted

  let result = true;

  let date = dateEl.value;
  let name = nameEl.value;
  let amount = +amountEl.value;
  let qty = +quantityEl.value;

  if (amount === 0 || isNaN(amount)) {
    result = false;
    showError(amountEl, "&#x2717; Please enter a valid amount", true);
  } else {
    showError(amountEl, "&check; Looks good", false);
  }
  if (!name) {
    result = false;
    showError(nameEl, "&#x2717; Please enter a type or item name", true);
  } else {
    showError(nameEl, "&check; Looks good", false);
  }

  if (!date) {
    result = false;
    showError(dateEl, "&#x2717; Please enter a valid date", true);
  } else {
    showError(dateEl, "&check; Looks good", false);
  }

  if (quantityEl.value === "") {
    qty = 1;
    quantityEl.value = String(qty);
  } else {
    if (qty <= 0 || isNaN(qty)) {
      result = false;
      showError(quantityEl, "&#x2717; Please enter a positive number", true);
    } else {
      showError(quantityEl, "&check; Looks good", false);
    }
  }
  return result;
};

// Calculate total income / expenses when a new transaction is added

const calculate = () => {
  totalIncomeValue = 0;
  totalExpensesValue = 0;
  balanceValue = 0;

  allTransactions.forEach((tran) => {
    tran.totalAmount = tran.qty * tran.itemPrice;

    if (tran.totalAmount > 0) {
      totalIncomeValue += tran.totalAmount;
    }
    if (tran.totalAmount < 0) {
      totalExpensesValue += tran.totalAmount;
    }
  });
  balanceValue = totalIncomeValue + totalExpensesValue;
};

// Update DOM - render expenses on the page
const updateDOM = () => {
  transactionsList.replaceChildren();

  allTransactions.forEach((tran) => {
    const listItem = document.createElement("li");

    let pricePerUnit = "";
    if (tran.qty > 1) {
      pricePerUnit = `<p class="price-per-unit">${tran.qty} @ ${tran.itemPrice} each</p>`;
    }

    // listItem.setAttribute("id", `${tran.id}`);
    listItem.classList.add("transaction");

    listItem.innerHTML = `
    <time class="display-date">&#128198; ${tran.date
      .split("-")
      .reverse()
      .join("-")}
    </time>
  
   <section class="transaction-details ${
     tran.itemPrice < 0 ? "minus" : "plus"
   }" id=${tran.id}>
    <div class="item-details">
      <span class="item-name">${tran.name}</span>  
      <span class="value">${Number(tran.totalAmount.toFixed(2)).toLocaleString(
        "en-IN"
      )}</span>
    </div>
    
    ${pricePerUnit}
    
    <button class="edit-item">&#128397;
      <span class="tooltip-text edit">Edit</span>
    </button>

    <button class="delete-item">&#128465;
      <span class="tooltip-text delete">Delete</span>
    </button>
  </section>
    `;

    transactionsList.appendChild(listItem);
  });

  balance.innerHTML = `&#128176;${Number(
    balanceValue.toFixed(2)
  ).toLocaleString("en-IN")}`;
  totalIncome.innerHTML = `${Number(totalIncomeValue.toFixed(2)).toLocaleString(
    "en-IN"
  )}`;

  totalExpenses.innerHTML = `${Number(
    totalExpensesValue.toFixed(2)
  ).toLocaleString("en-IN")}`;

  if (!balanceValue) balance.innerHTML = "0.00";
  if (!totalIncomeValue) totalIncome.innerHTML = "0.00";
  if (!totalExpensesValue) totalExpenses.innerHTML = "0.00";

  transactionName.value = "";
  transactionAmount.value = "";
  quantity.value = "";

  updateLocalStorage();
};

// Update local storage
const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(allTransactions));
};

const init = () => {
  calculate();
  list.innerHTML = "";

  allTransactions.forEach(updateDOM);
};
init();

// ---------------- EVENTS ---------------- //
// Add a new transaction to the list
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    !validateInput(
      transactionDate,
      transactionName,
      transactionAmount,
      quantity
    )
  )
    return;

  newTransaction(
    transactionDate.value,
    transactionName.value,
    transactionAmount.value,
    quantity.value
  );

  transactionDate.classList.remove("success");

  showError(transactionDate, "", false);
  showError(transactionName, "", false);
  showError(transactionAmount, "", false);
  showError(quantity, "", false);

  calculate();
  updateDOM();
});

// Edit and deleting a transactions from the list
transactionsList.addEventListener("click", (e) => {
  // If user clicks on list, do nothing
  if (e.target.nodeName !== "BUTTON") return;

  let itemId = +e.target.parentNode.id;
  // If user clicks on the "Delete" button ...
  if (e.target.classList.contains("delete-item")) {
    deleteItemModal.dataset["toDelete"] = itemId;
    deleteItemModal.classList.add("show-modal");
  }
  // If user clicks on the "Edit" button ...
  if (e.target.classList.contains("edit-item")) {
    let editTransaction = allTransactions.filter(
      (item) => itemId === item.id
    )[0];

    editName.value = editTransaction.name;
    editAmount.value = editTransaction.itemPrice;
    editDate.value = editTransaction.date;
    editQuantity.value = editTransaction.qty;

    showError(editDate, "", false);
    showError(editName, "", false);
    showError(editAmount, "", false);
    showError(editQuantity, "", false);

    editItemModal.dataset["toEdit"] = itemId;
    editItemModal.classList.add("show-modal");
  }

  calculate();
  updateDOM();
});

// Modal form - save edited entries
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateInput(editDate, editName, editAmount, editQuantity)) return;

  let itemId = +editItemModal.dataset["toEdit"];
  let editTransaction = allTransactions.filter((item) => item.id === itemId)[0];

  editTransaction.date = editDate.value;
  editTransaction.name = editName.value;
  editTransaction.itemPrice = +editAmount.value;
  editTransaction.qty = +editQuantity.value;

  calculate();
  updateLocalStorage();
  updateDOM();

  editItemModal.classList.remove("show-modal");
});

// Cancel edit
cancelChange.addEventListener("click", (e) => {
  e.preventDefault();
  editItemModal.classList.remove("show-modal");
});

// Modal form - delete item
confirmDelete.addEventListener("click", (e) => {
  e.preventDefault();
  let itemId = +deleteItemModal.dataset["toDelete"];
  allTransactions = allTransactions.filter((item) => item.id !== itemId);

  calculate();
  updateLocalStorage();
  updateDOM();

  deleteItemModal.classList.remove("show-modal");
});

cancelDelete.addEventListener("click", (e) => {
  e.preventDefault();
  deleteItemModal.classList.remove("show-modal");
});
