// Add new transaction modal buttons
const incomeBtn = document.getElementById("income");
const expenseBtn = document.getElementById("expense");

// New transactions modal
const newTransactionModal = document.querySelector(
  ".new-transaction-modal-container"
);
const newTransactionForm = document.querySelector("#form");
const transactionName = document.querySelector("#transaction");
const transactionAmount = document.querySelector("#amount");
const transactionDate = document.querySelector("#transaction-date");
const transactionQty = document.querySelector("#number");
const closeForm = document.getElementById("close-new-tran");

// Add new transaction form elements
const balance = document.querySelector("#balance");
const totalIncome = document.querySelector("#total-income");
const totalExpenses = document.querySelector("#total-expenses");
const transactionsList = document.querySelector("#list");

// Edit existing transaction form elements (modal)
const editItemModal = document.querySelector(".modal-container");
const editForm = document.querySelector("#modal-form");
const editDate = document.querySelector("#edit-date");
const editName = document.querySelector("#edit-name");
const editAmount = document.querySelector("#edit-amount");
const editQuantity = document.querySelector("#edit-qty");

// Confirmation for deleting a transcaction (modal)
const deleteItemModal = document.querySelector(".undo-modal-container");
const confirmDelete = document.querySelector("#delete-btn");
const cancelDelete = document.querySelector("#cancel-delete-btn");

// Modal header to be updated depending on the transaction type chosen
const transactionModalHeader = document.getElementById("new-transaction-title");

// ---------------- FUNCTIONALITY ---------------- //

// Default value for date input
const fullDate = new Date();
const month = fullDate.getMonth() + 1;
const date = fullDate.getDate();
const year = fullDate.getFullYear();

let displayMonth = month < 10 ? `0${month}` : `${month}`;
let displayDay = date < 10 ? `0${date}` : `${date}`;

const displayDate = `${year}-${displayMonth}-${date}`;
transactionDate.setAttribute("value", `${displayDate}`);

//Show Input Error Message
const showError = (input, message, isError) => {
  const formControl = input.parentElement;
  const errMsg = formControl.querySelector("small");

  if (isError === undefined) {
    formControl.className = "form-control";
    errMsg.innerHTML = "";
  } else {
    formControl.classList.add(`${isError ? "error" : "success"}`);
    formControl.classList.remove(`${isError ? "success" : "error"}`);
    errMsg.innerHTML = message;
  }
};

// Get items from localstorage
const localStorageTransaction = JSON.parse(
  localStorage.getItem("transactions")
);
// Save transactions added to the list
let allTransactions = localStorageTransaction || [];

// Globals. They change with state updates
let totalIncomeValue = 0;
let totalExpensesValue = 0;
let balanceValue = 0;
let nextTransactionId =
  allTransactions.length === 0
    ? 1
    : Math.max(...allTransactions.map((tran) => tran.id)) + 1;

let newTransBtnId = "";

// Add new transaction to array
const newTransaction = (date, name, itemPrice, qty) => {
  let transaction = {
    id: nextTransactionId++,
    date,
    name,
    type: newTransBtnId,
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
  let qty = quantityEl.value;

  let successMsg = "&check;";
  let errMsg = "Can't be empty";

  if (isNaN(amount)) {
    result = false;
    showError(amountEl, "Must be a number", true);
  } else if (amount === 0) {
    showError(amountEl, "Can't be 0", true);
  } else {
    showError(amountEl, successMsg, false);
  }
  if (!name) {
    result = false;
    showError(nameEl, errMsg, true);
  } else {
    showError(nameEl, successMsg, false);
  }

  if (!date) {
    result = false;
    showError(dateEl, "Add a date", true);
  } else {
    showError(dateEl, successMsg, false);
  }

  if (isNaN(qty) || !qty) {
    result = false;
    showError(quantityEl, "Invalid number", true);
  } else if (+qty === 0) {
    showError(quantityEl, "Can't be 0", true);
  } else {
    showError(quantityEl, successMsg, false);
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

    if (tran.type === "income") {
      totalIncomeValue += tran.totalAmount;
    } else if (tran.type === "expense") {
      totalExpensesValue += tran.totalAmount;
    }
  });
  balanceValue = totalIncomeValue - totalExpensesValue;
};

// Update DOM - render expenses on the page
const updateDOM = () => {
  transactionsList.replaceChildren();

  // Sort the transaction list based on date
  let sortedList = JSON.parse(JSON.stringify(allTransactions));
  sortedList.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Display transaction items in descending order
  sortedList.forEach((tran) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("id", tran.id);
    listItem.classList.add(`${tran.type === "expense" ? "minus" : "plus"}`);

    let pricePerUnit = "";
    if (tran.qty > 1) {
      pricePerUnit = `<p class="price-per-unit">${tran.qty} @ ${tran.itemPrice} each</p>`;
    }

    // Determins the name of the day
    const day = new Intl.DateTimeFormat("en-AU", { weekday: "long" }).format(
      new Date(tran.date)
    );

    // formatting the displayed date so that I can make use of date and year according to display goals
    const dateElements = tran.date.split("-").reverse();
    dateElements[1] = new Date(dateElements[1]).toLocaleDateString("en-AU", {
      month: "short",
    });

    const tranYear = dateElements.pop();

    listItem.classList.add("transaction");

    listItem.innerHTML = `
    <section>    
      <time class="display-date">
        ${
          // Needs rewritting but for the time being the logic works to display days as intended
          tran.date === transactionDate.value
            ? `TODAY, ${dateElements.join(" ")}`
            : new Date(tran.date).getDay() === fullDate.getDay() - 1 &&
              +tranYear === +year
            ? `YESTERDAY, ${dateElements.join(" ")}`
            : +tranYear === +year
            ? `${day.toUpperCase()}, ${dateElements.join(" ")}`
            : `${day.toUpperCase()}, ${dateElements.join(" ")} ${tranYear}`
        }
      </time> 
      
      <div class="dropdown">
        <button class="dropdown-btns">
          <i class="fa-solid fa-ellipsis"></i>
       </button>
        <div class="dropdown-content">
          <button class="edit-item">Edit </button>
          <button class="delete-item">Delete </button>
        </div>
      </div>
    </section>

    <section class="details">
      <span class="item-name">${tran.name}</span>  
      <div class="item-details">
        <span class="value">
          ${Number(tran.totalAmount.toFixed(2)).toLocaleString("en-UK")}
        </span>
 
      </div>
    </section>
    ${pricePerUnit}`;

    transactionsList.appendChild(listItem);
  });

  balance.innerHTML = `${Number(balanceValue.toFixed(2)).toLocaleString(
    "en-IN"
  )}`;
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
  transactionQty.value = "";

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

const dropdownBtns = (target) => {
  let dropMenu = target.nextElementSibling;

  document.querySelectorAll(".dropdown-content").forEach((el) => {
    if (el !== dropMenu) el.style.display = "none";
    else el.style.display = el.style.display !== "flex" ? "flex" : "none";
  });
};

// Edit / Delete a list item
const deleteOrEditItem = (target) => {
  let itemId = +target.parentNode.parentNode.parentNode.parentNode.id;

  // If user clicks on the "Delete" button ...
  if (target.classList.contains("delete-item")) {
    deleteItemModal.dataset["toDelete"] = itemId;
    deleteItemModal.classList.add("show-modal");
  }
  // If user clicks on the "Edit" button ...
  if (target.classList.contains("edit-item")) {
    let editTransaction = allTransactions.filter(
      (item) => itemId === item.id
    )[0];

    // add header to edit modal
    document.getElementById(
      "edit-form-header"
    ).innerHTML = `Edit ${editTransaction.type}`;

    document.querySelector(
      `input[value=${editTransaction.type}]`
    ).checked = true;

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
};
// ---------------- EVENTS ---------------- //
// Add a new transaction to the list
newTransactionForm.onsubmit = (e) => {
  e.preventDefault();

  if (
    !validateInput(
      transactionDate,
      transactionName,
      transactionAmount,
      transactionQty
    )
  )
    return;

  newTransaction(
    transactionDate.value,
    transactionName.value,
    transactionAmount.value,
    transactionQty.value
  );

  transactionDate.classList.remove("success");

  showError(transactionDate, "", false);
  showError(transactionName, "", false);
  showError(transactionAmount, "", false);
  showError(transactionQty, "", false);

  calculate();
  updateDOM();
}

newTransactionForm.onreset = () => {
  newTransactionForm.reset();
  document.querySelectorAll("#form input").forEach((childEl) => {
    showError(childEl);
  });
};

closeForm.onclick = () => {
  newTransactionForm.reset();
  newTransactionModal.classList.remove("show-modal");
};

// Edit and deleting a transactions from the list
transactionsList.onclick = (e) => {
  if (e.target.classList.contains("dropdown-btns")) {
    dropdownBtns(e.target);
  } else {
    deleteOrEditItem(e.target);
    calculate();
    updateDOM();
  }
};

// Modal form - save edited entries
editForm.onsubmit = (e) => {
  e.preventDefault();

  if (!validateInput(editDate, editName, editAmount, editQuantity)) return;

  let itemId = +editItemModal.dataset["toEdit"];
  let editTransaction = allTransactions.filter((item) => item.id === itemId)[0];

  const editTransType = document.querySelector("input[type=radio]:checked");

  editTransaction.date = editDate.value;
  editTransaction.name = editName.value;
  editTransaction.type = editTransType.value;
  editTransaction.itemPrice = +editAmount.value;
  editTransaction.qty = +editQuantity.value;

  calculate();
  updateLocalStorage();
  updateDOM();

  editItemModal.classList.remove("show-modal");
};

// Cancel edit
editForm.onreset = (e) => {
  e.preventDefault();
  editItemModal.classList.remove("show-modal");
};

// Modal form - delete item
confirmDelete.onclick = (e) => {
  e.preventDefault();
  let itemId = +deleteItemModal.dataset["toDelete"];
  allTransactions = allTransactions.filter((item) => item.id !== itemId);

  calculate();
  updateLocalStorage();
  updateDOM();

  deleteItemModal.classList.remove("show-modal");
};

cancelDelete.onclick = (e) => {
  e.preventDefault();
  deleteItemModal.classList.remove("show-modal");
};

incomeBtn.onclick = (e) => {
  newTransBtnId = e.target.id;
  transactionModalHeader.innerText = "Add Income";
  newTransactionModal.classList.add("show-modal");
};

expenseBtn.onclick = (e) => {
  newTransBtnId = e.target.id;
  transactionModalHeader.innerText = "Add Expense";
  newTransactionModal.classList.add("show-modal");
};

// // ----- Window events -----
window.onclick = (e) => {
  const dropdownBtns = document.querySelectorAll(".dropdown-content");

  if (!e.target.classList.contains("dropdown-btns"))
    dropdownBtns.forEach((el) => (el.style.display = "none"));
};
