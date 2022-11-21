import {
    Auth
} from "../account/Auth.js";
import {
    Account
} from "../server/account.js"
import {
    FormValidation
} from "../validation/formvalidation.js";

const loginBtn = document.querySelector("#login_button");


const formvalidation = new FormValidation();
const account = new Account();
const auth = new Auth();

window.onload = function init() {
    
}


$("#email").on("blur", function (event) {
    var email = event.target.value;

    if (!formvalidation.isTextValidationCheck(email)) {
        return;
    }

    if (!formvalidation.isEmailValidationCheck(email)) {
        $("#login_form").appearErrorMessage("email-message");
        $("#login_form").setErrorMessage(`email-message`, "Email형식이 맞지 않습니다.");
    } else {
        $("#login_form").disappearErrorMessage("email-message");

    }

});

$("#password").on("blur", function (event) {
    var password = event.target.value;

    if (!formvalidation.isTextValidationCheck(password)) {
        return;
    }

    if (!formvalidation.isPasswordValidationCheck(password)) {
        $("#login_form").appearErrorMessage("password-message");
        $("#login_form").setErrorMessage(`password-message`, "Password 형식이 맞지 않습니다.");
    } else {
        $("#login_form").disappearErrorMessage("password-message");
    }
});


function login(event) {
    event.preventDefault();

    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    var validResult = formvalidation.isLoginFormCheck("login_form");

    var result = validResult.forEach((data) => {

        if (data.returnCode) {
            return data.message;
        } else {
            $("login_form").appearErrorMessage(`${data.id}-message`);
            $("login_form").setErrorMessage(`${data.id}-message`, data.message);
        }
    });

    if (result == "SUCCESS") {
        
    }
    
  
    account.login({
        email: email.value,
        password: password.value
    });

}


function loginout(event) {
    event.preventDefault();

    var result = fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: `${email.value}`,
            password: `${password.value}`,
        }),
    }).then(Response => Response.text()).then((data) => {
        auth.setJsonToken(data);
        window.location.href = mainPageAddress;
    }).catch((error) => {
        console.log(error);
    });
}

loginBtn.addEventListener("click", login);