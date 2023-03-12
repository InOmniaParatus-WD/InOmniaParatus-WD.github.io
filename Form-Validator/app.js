const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const pw = document.getElementById("password");
const pwConfirm = document.getElementById("confirmation");

//Show Input Error Message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const errMsg = formControl.querySelector("small");
  errMsg.innerHTML = message;
};

// Show Success Outline
const showSuccess = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";

  const errMsg = formControl.querySelector("small");
  errMsg.innerHTML = message;
};

//Check if required inputs are empty
const checkRequired = (arr) => {
  const getFieldName = (input) => {
    let fieldName = input.id;
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  };
  arr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    }
  });
};

//Validate Username
const isUsername = (user) => {
  const RegExp = /^([a-zA-Z0-9@*#_.]{5,})$/;
  let valid = RegExp.test(user.value);

  if (user.value !=="" && !valid){
    showError(user, "&#x2717 Username not valid")
  }
  else if(user.value !== "" && valid) {
    showSuccess(user,  "&check; Looks good")
  }
}

//Validates Email
const isValidEmail = (email) => {
  const RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let valid = RegExp.test(email.value.toLowerCase());

  if (email.value !== "" && !valid) {
    showError(email, "&#x2717; Not a valid email");
  } else if (valid) {
    showSuccess(email, "&check; Looks good");
  }
};

//Validates Password
const isValidPassword = (password) => {
  const RegExp = /^([a-zA-Z0-9@*#]{8,15})$/;
  let valid = RegExp.test(password.value);

  if (password.value !== "" && !valid) {
    showError(password, "&#x2717; Password must be 8 - 15 characters long");
  } else if (valid) {
    showSuccess(password, "&check; Looks good");
  }
};

//Validates Password Confirmation
const isSamePassword = (confirm) => {
  if (confirm.value !== "" && confirm.value !== pw.value) {
    showError(confirm, "&#x2717; Passwords don't match");
  } else if (confirm.value !== "" && confirm.value === pw.value) {
    showSuccess(confirm, "&check; Looks good");
  }
};

//Show-Hide Password ??????

//Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, pw, pwConfirm]);

  isUsername(username)
  isValidEmail(email);
  isValidPassword(pw);
  isSamePassword(pwConfirm);
});

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (username.value === "") {
//     showError(username, "&#x2717; Username is required");
//   } else {
//     showSuccess(username, "&check; Username available");
//   }

//   if (email.value === "") {
//     showError(email, "&#x2717; Email is required");
//   } else {
//     let valid = isValidEmail(email);
//     if (valid === null) {
//       showError(email, "&#x2717; Not a valid format");
//     } else {
//       showSuccess(email, "&check; Looks good");
//     }
//   }

//   if (pw.value === "") {
//     showError(pw, "&#x2717; Password is required");
//   } else {
//     let valid = isValidPassword(pw)
//     if(valid === null) {
//       showError(pw, "Password muut be 8 - 15 characters long")
//     } else {
//        showSuccess(pw, "&check; Password valid");
//     }
//   }

//   if (pwConfirm.value === "" || pwConfirm.value !== pw.value) {
//     showError(pwConfirm, "&#x2717; Passwords don't match");
//   } else {
//     showSuccess(pwConfirm, "&check; Match");
//   }
// });