// Add new transaction form elements
const balance = document.querySelector("#balance");
const totalIncome = document.querySelector("#income");
const totalExpenses = document.querySelector("#expenses");
const transactionName = document.querySelector("#text");
const transactionAmount = document.querySelector("#amount");
const dateEl = document.querySelector("#transaction-date");
const transactionsList = document.querySelector("#list");
const form = document.querySelector("#form");

// Edit existing transaction form elements (modal)
const editItemModal = document.querySelector(".modal-container");
const editForm = document.querySelector("#modal-form");
const cancelChange = document.querySelector("#cancel-btn");
const editDate = document.querySelector("#edit-date");
const editName = document.querySelector("#edit-name");
const editAmount = document.querySelector("#edit-amount");

// Confirmation for deleting a transcaction (modal)
const deleteItemModal = document.querySelector(".undo-modal-container");
const confirmDelete = document.querySelector("#delete-btn");
const cancelDelete = document.querySelector("#cancel-delete-btn");

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
let allTransactions =
  localStorage.getItem("transactions") !== null ? localStorageTransaction : [];

let totalIncomeValue = 0;
let totalExpensesValue = 0;
let balanceValue = 0;

// Generate random ID
const createID = () => {
  return Math.floor(Math.random() * 10000000);
};

// Add new transaction to array
const newTransaction = (date, name, value) => {
  let transaction = { id: createID(), date, name, value: +value };
  allTransactions.push(transaction);
  console.log(allTransactions);
};

const validateInput = (dateEl, nameEl, amountEl) => {
  let result = true;
  let amount = +amountEl.value;
  let name = nameEl.value;
  let date = dateEl.value;

  let dateRegex = /\d{2}\/\d{2}\/\d{4}/g;

  if (amount === 0 || !amount || isNaN(amount)) {
    result = false;
    showError(amountEl, "&#x2717; Please enter a valid amount", true);
  } else {
    showError(amountEl, "&check; Looks good", false);
  }
  if (!name) {
    result = false;
    showError(nameEl, "&#x2717; Please enter a valid name", true);
  } else {
    showError(nameEl, "&check; Looks good", false);
  }
  if (!date || !dateRegex.test(date)) {
    result = false;
    showError(dateEl, "&#x2717; Please enter a valid date", true);
  } else {
    showError(dateEl, "&check; Looks good", false);
  }

  return result;
};

// Calculate total income / expenses when a new transaction is added
const calculate = () => {
  totalIncomeValue = 0;
  totalExpensesValue = 0;
  balanceValue = 0;

  allTransactions.forEach((item) => {
    if (item.value > 0) {
      totalIncomeValue += item.value;
    }
    if (item.value < 0) {
      totalExpensesValue += item.value;
    }
  });
  balanceValue = totalIncomeValue + totalExpensesValue;
};

// Update DOM
const updateDOM = () => {
  transactionsList.replaceChildren();

  allTransactions.forEach((item) => {
    const listItem = document.createElement("li");

    listItem.setAttribute("id", `${item.id}`);
    listItem.classList.add("transaction");
    listItem.classList.add(item.value < 0 ? "minus" : "plus");

    listItem.innerHTML = `
    <span class="item-name">${item.name}</span>
    <span class="value">${Number(item.value.toFixed(2)).toLocaleString(
      "en-IN"
    )}</span>
    <button class="edit-item">&#128397;
      <span class="tooltip-text edit">Edit transaction</span>
    </button>
    <button class="delete-item">&#128465;
      <span class="tooltip-text delete">Delete transaction</span>
    </button>
    `;

    const dateListItem = document.createElement("li");
    dateListItem.classList.add("display-date");
    dateListItem.innerHTML = `&#128198;
      <span class="entry-date">${item.date}</span>
   `;

    transactionsList.appendChild(dateListItem);
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
  dateEl.value = "";

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
let itemID = 0;
let editEntry;

// Add a new transaction to the list
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateInput(dateEl, transactionName, transactionAmount)) return;

  newTransaction(dateEl.value, transactionName.value, transactionAmount.value);

  showError(dateEl, "", false);
  showError(transactionName, "", false);
  showError(transactionAmount, "", false);

  calculate();
  updateDOM();
});

// Edit and deleting a transactions from the list
transactionsList.addEventListener("click", (e) => {
  // If user clicks on list, do nothing
  if (e.target.nodeName !== "BUTTON") return;

  itemID = +e.target.parentNode.id;
  // If user clicks in the "Delete" button ...
  if (e.target.classList.contains("delete-item")) {
    deleteItemModal.classList.add("show-modal");
  }
  // If user clicks on the "Edit" button ...
  if (e.target.classList.contains("edit-item")) {
    editEntry = allTransactions.filter((item) => itemID === item.id)[0];

    editName.value = editEntry.name;
    editAmount.value = editEntry.value;
    editDate.value = editEntry.date;

    showError(editDate, "", false);
    showError(editName, "", false);
    showError(editAmount, "", false);

    editItemModal.classList.add("show-modal");
  }

  calculate();
  updateDOM();
});

// Modal form - save edited entries
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateInput(editDate, editName, editAmount)) return;

  editEntry.date = editDate.value;
  editEntry.name = editName.value;
  editEntry.value = +editAmount.value;

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
  allTransactions = allTransactions.filter((item) => item.id !== itemID);

  calculate();
  updateLocalStorage();
  updateDOM();

  deleteItemModal.classList.remove("show-modal");
});
cancelDelete.addEventListener("click", (e) => {
  e.preventDefault();
  deleteItemModal.classList.remove("show-modal");
});