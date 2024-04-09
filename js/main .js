let registerName = document.querySelector("#registerName");
let registerEmail = document.querySelector("#registerEmail");
let registerPassword = document.querySelector("#registerPassword");
let loginEmail = document.querySelector("#loginEmail");
let loginPassword = document.querySelector("#loginPassword");
let nameAlert = document.querySelector("#nameAlert");
let emailAlert = document.querySelector("#emailAlert");
let passwordAlert = document.querySelector("#passwordAlert");
let successAlert = document.querySelector("#successAlert");
let loginAlert = document.querySelector("#loginAlert");
let welcomeMessage = document.querySelector("#welcomeMessage");
let accountList;
let successUser;
// check local storage
if (localStorage.getItem("accountList") === null) {
  accountList = [];
} else {
  accountList = JSON.parse(localStorage.getItem("accountList"));
}
// function to add account
let addAccount = () => {
  //check validation
  if (
    nameValidation() === true &&
    emailValidation() === true &&
    passwordlValidation() === true
  ) {
    let account = {
      name: registerName.value,
      email: registerEmail.value,
      password: registerPassword.value,
    };
    accountList.push(account);
    addToLocalStorage();
    clearInputs();
    successAlert.classList.replace("d-none", "d-block");
    setTimeout(() => {
      window.open("../index.html", "_self");
    }, 500);
  } else if (nameValidation() === false) {
    nameAlert.classList.replace("d-none", "d-block");
  } else if (emailValidation() === false) {
    emailAlert.classList.replace("d-none", "d-block");
  } else if (passwordValidation() === false) {
    passwordAlert.classList.replace("d-none", "d-block");
  }
};
//function to add to localStorage
let addToLocalStorage = () => {
  localStorage.setItem("accountList", JSON.stringify(accountList));
};
// function to clear inputs
let clearInputs = () => {
  registerEmail.value = "";
  registerName.value = "";
  registerPassword.value = "";
};
//function to validate name
let nameValidation = () => {
  let regex = /^[a-z0-9_-]{3,15}$/;
  let res = regex.test(registerName.value);
  if (res) {
    nameAlert.classList.replace("d-block", "d-none");
    registerName.classList.add("is-valid");
    registerName.classList.remove("is-invalid");
    return true;
  } else {
    nameAlert.classList.replace("d-none", "d-block");
    registerName.classList.remove("is-valid");
    registerName.classList.add("is-invalid");
    return false;
  }
};
//function to validate email
let emailValidation = () => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let res = regex.test(registerEmail.value);
  if (res) {
    emailAlert.classList.replace("d-block", "d-none");
    registerEmail.classList.add("is-valid");
    registerEmail.classList.remove("is-invalid");
    return true;
  } else {
    emailAlert.classList.replace("d-none", "d-block");
    registerEmail.classList.remove("is-valid");
    registerEmail.classList.add("is-invalid");
    return false;
  }
};
//function to validate email
let passwordlValidation = () => {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let res = regex.test(registerPassword.value);
  if (res) {
    passwordAlert.classList.replace("d-block", "d-none");
    registerPassword.classList.add("is-valid");
    registerPassword.classList.remove("is-invalid");
    return true;
  } else {
    passwordAlert.classList.replace("d-none", "d-block");
    registerPassword.classList.remove("is-valid");
    registerPassword.classList.add("is-invalid");
    return false;
  }
};
// function to check login email
let  checkLogin = () => {
  let email = loginEmail.value;
  let password = loginPassword.value;
  let data = JSON.parse(localStorage.getItem("accountList"));
  for (let i = 0; i < data.length; i++) {
    if (data[i].email === email && data[i].password === password) {
      successUser = data[i].name;
      localStorage.setItem("successUser", successUser);
      loginAlert.classList.replace("d-none", "d-block");
      loginAlert.classList.replace("alert-danger", "alert-success");
      loginAlert.innerHTML = "success";
      setTimeout(() => {
        window.open("./pages/home.html", "_self");
      }, 500);
      clearLoginInputs();
    }else  {
      loginAlert.classList.replace("d-none", "d-block");
    }
  }
  
};
// welcome user
  welcomeMessage.innerHTML = `welcome ${localStorage.getItem("successUser")} !`;
//function to logout
let logout = () => {
  window.open("../index.html", "_self");
};
//clear login inputs
let clearLoginInputs = () => {
  loginEmail = "";
  loginPassword = "";
};


