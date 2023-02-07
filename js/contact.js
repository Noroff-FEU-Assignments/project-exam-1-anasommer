const form = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const nameError = document.querySelector(".name-error");
const emailError = document.querySelector(".email-error");
const subjectError = document.querySelector(".subject-error");
const messageError = document.querySelector(".message-error");
const sendBtn = document.querySelector("#send-btn");

let formValid = false;
let emailValid = false;

sendBtn.setAttribute("disabled", "disabled");

const nameMinLength = 5;
const subjectMinLength = 15;
const messageMinLength = 25;

function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  if (!email.value.match(regex)) {
    emailError.style.display = "block";
    emailValid = false;
  } else {
    emailError.style.display = "none";
    emailValid = true;
  }
}

function checkValidation(input, minLength, errorSpan) {
  if (input.value.length < minLength) {
    errorSpan.style.display = "block";
    formValid = false;
  } else {
    errorSpan.style.display = "none";
    formValid = true;
  }
}

function validateForm() {
  checkValidation(name, nameMinLength, nameError);
  checkValidation(subject, subjectMinLength, subjectError);
  checkValidation(message, messageMinLength, messageError);
  validateEmail(email);

  if (formValid && emailValid) {
    sendBtn.removeAttribute("disabled");
  }
}

form.addEventListener("input", validateForm);

sendBtn.addEventListener("click", function () {
  form.innerHTML = `Your message has been successfully sent`;
});
