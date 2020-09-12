let form = document.getElementsByTagName("form")[0];
let errorTags = document.querySelectorAll("small");
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let errorsTable = {
  username: 0,
  email: 1,
  password: 2,
  "confirm-password": 3,
};

form.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();
  validate("username", "username");
  validate("email", "email");
  validate("password", "password");
  validate("confirm-password", "password");
}

function validate(entity, type) {
  let element = document.querySelector(`#${entity}`);
  switch (type) {
    case "username":
      if (element.value === "") {
        errorTags[errorsTable[entity]].classList.add("error-text");
        errorTags[errorsTable[entity]].innerText =
          "Invalid username, username must container alteals 2 characters.";
        element.classList.add("error");
      } else {
        element.classList.remove("error", "success");
        element.classList.add("success");
        errorTags[errorsTable[entity]].innerText = "";
        errorTags[errorsTable[entity]].classList.remove("error-text");
      }
      break;
    case "email":
      if (element.value !== "" && emailRegex.test(element.value)) {
        errorTags[errorsTable[entity]].innerText = "";
        element.classList.remove("error", "success");
        element.classList.add("success");
        errorTags[errorsTable[entity]].classList.remove("error-text");
      } else {
        errorTags[errorsTable[entity]].classList.add("error-text");
        element.classList.add("error");
        errorTags[errorsTable[entity]].innerText =
          "Invalid email, email must be a valid email address.";
      }
      break;
    case "password":
      if (element.value.length < 6) {
        errorTags[errorsTable[entity]].classList.add("error-text");
        element.classList.add("error");
        if (entity === "password") {
          errorTags[errorsTable[entity]].innerText =
            "Invalid password, password lenght must be 6 characers long.";
        } else {
          errorTags[errorsTable[entity]].innerText =
            "Invalid confirm password, confirm password should be same as password.";
        }
      } else if (
        entity !== "password" &&
        element.value !== document.querySelector("#password").value
      ) {
        errorTags[errorsTable[entity]].classList.add("error-text");
        element.classList.add("error");
        errorTags[errorsTable[entity]].innerText =
          "Invalid confirm password, confirm password should be same as password.";
      } else {
        element.classList.remove("error", "success");
        element.classList.add("success");
        errorTags[errorsTable[entity]].innerText = "";
        errorTags[errorsTable[entity]].classList.remove("error-text");
      }
      break;
  }
}
