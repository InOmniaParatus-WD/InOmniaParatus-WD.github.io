const main = $("main");
const addUserBtn = $("#add_user");
const doubleBtn = $("#double_money");
const showMillionairesBtn = $("#show_millionaires");
const sortBtn = $("#sort_richest");
const calculateBtn = $("#calculate_wealth");
const list = $("ul");

let allData = [];
let showOnlyMillionaires = false;

// ----- Fetch random user and add money ----- //
function getUser(userCount) {
  return $.ajax({
    url: `https://randomuser.me/api?results=${2 * userCount}&inc=name`,
    dataType: "json",
    success: function (data) {
      const users = data.results;
      let count = 0;

      for (let user of users) {
        // If user has a non-latin spelling of their name it will be rejected before it enters the user's data array
        if (
          !/[a-z]/gi.test(user.name.first + user.name.last) ||
          ++count > userCount
        )
          return;

        const newUser = {};
        newUser.username = `${user.name.first} ${user.name.last}`;
        newUser.money = Math.random() * 2 * 1000000;
        allData.push(newUser);
      }
    },
  });
}

// ----- Helper functions to calculate the amounts or sort users ----- //

// Format money displayed on DOM
function formatMoney(num) {
  const amount = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  });
  return amount.format(num);
}

// Populate the DOM with users' saved data
function populateDOM() {
  $(list).empty();

  allData.forEach((item) => {
    if (item.money < 1000000 && showOnlyMillionaires) return;

    const listItem = $("<li></li>");

    $(listItem).html(
      `<strong>${item.username}</strong> <span> ${formatMoney(
        item.money
      )}</span>`
    );

    $(list).append(listItem);
  });
}
// Update the DOM
$(document).ready(function () {
  getUser(3).done(populateDOM);
});

// Double the amount
function doubleMoney(data) {
  return data.map((user) => (user.money = user.money * 2));
}
// Show only millionaires
function showMillionaires(data) {
  // return data.filter((user) => user.money >= 1000000);
  showOnlyMillionaires = !showOnlyMillionaires;
  if (showOnlyMillionaires) showMillionairesBtn.text("Show All People");
  else showMillionairesBtn.text("Show Only Millionaires");
}
// Calculate total wealth
function totalWealth(data) {
  let total = data.reduce((pv, cv) => cv.money + pv, 0);

  let displayTotal = $("<h2></h2>");
  $(displayTotal)
    .html(`<strong>Total</strong> ${formatMoney(total)}`)
    .addClass("total");
  $(list).after(displayTotal);
}

// ----- EVENTS ON BUTTONS ----- //
$(addUserBtn).click(function () {
  getUser(1).done(populateDOM);
});

$(doubleBtn).click(function () {
  doubleMoney(allData);
  populateDOM();
});

$(showMillionairesBtn).click(function () {
  showMillionaires(allData);
  populateDOM();
});

$(sortBtn).click(function () {
  allData.sort((a, b) => b.money - a.money);
  populateDOM();
});

$(calculateBtn).click(function (e) {
  if (!$(this).data("clicked")) {
    totalWealth(allData);
  } else {
    $("h2.total").remove();
    totalWealth(allData);
  }
  $(this).data("clicked", true);
});