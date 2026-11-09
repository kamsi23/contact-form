//Grab all the form elements needed for validation
let form = document.querySelector(".contactForm");
let firstName = document.querySelector(".firstName");
let lastName = document.querySelector(".lastName");
let email = document.querySelector(".emailAddress");
let query = document.querySelectorAll(".query");
let message = document.querySelector(".messageContent");
let consent = document.querySelector(".consent");
let button = document.querySelector(".button");

//grab all the error message
let errFirstName = document.querySelector(".error-fn");
let errLastName = document.querySelector(".error-ln");
let errEmail = document.querySelector(".error-em");
let errQueryType = document.querySelector(".error-qt");
let errMsg = document.querySelector(".error-msg");
let errConsent = document.querySelector(".error-checkbox");

//SUCCESS TOASTER
let success = document.querySelector(".success");

//Function to handle success toasre
let toaster = (valid) => {
  if (valid) {
    success.classList.remove("hidden");
    setTimeout(() => {
      success.classList.add("hidden");
    }, 3000);
  } else {
    success.classList.add("hidden");
  }
};

//FUNCTION TO HANDLE ERROR MESSAGES
let showError = (valid, errMsg, input) => {
  if (valid) {
    errMsg.classList.remove("hidden");
    input.style.borderColor = "var(--Red)";
  } else {
    errMsg.classList.add("hidden");
    input.style.borderColor = "";
  }
};
query.forEach((eachInput) => {
  eachInput.addEventListener("change", () => {
    query.forEach((each) => {
      let parent = each.parentElement;
      if (each.checked) {
        parent.style.backgroundColor = "var(--Green200)";
      } else {
        parent.style.backgroundColor = "";
      }
    });
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  //VALIDATOR FOR ALL FORM ELEMENTS
  //FIRST NAME
  if (firstName.value.trim() === "") {
    showError(true, errFirstName, firstName);
    isValid = false;
  } else {
    showError(false, errFirstName, firstName);
  }

  //LAST NAME
  if (lastName.value.trim() === "") {
    showError(true, errLastName, lastName);
    isValid = false;
  } else {
    showError(false, errLastName, lastName);
  }

  //EMAIL
  if (email.value.trim() === "") {
    showError(true, errEmail, email);
    isValid = false;
  } else {
    showError(false, errEmail, email);
  }

  //MESSAGE
  if (message.value.trim() === "") {
    showError(true, errMsg, message);
    isValid = false;
  } else {
    showError(false, errMsg, message);
  }

  //CONSENT
  if (!consent.checked) {
    showError(true, errConsent, consent);
    isValid = false;
  } else {
    showError(false, errConsent, consent);
  }

  //QUERY TYPE
  let checkedRadio = document.querySelector(".query:checked");
  if (!checkedRadio) {
    errQueryType.classList.remove("hidden");
  } else {
    errQueryType.classList.add("hidden");
  }

  //IF ALL VALIDATIONS PASS,STORE THE USERDATE,DISPLAY SUCCESS TOASTER AND RESET THE FORM

  if (isValid) {
    let userData = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      queryType: checkedRadio.value,
      message: message.value.trim(),
      consent: consent.checked,
    };
    console.log("FORM SUBMITTED SUCCESSFULLY", userData);
    toaster(isValid);
    form.reset();

    query.forEach((each) => {
      let parent = each.parentElement;
      parent.style.backgroundColor = "";
    });
  }
});
