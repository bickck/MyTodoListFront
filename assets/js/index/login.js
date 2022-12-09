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

    var isPassEmpty = isEmptyCheck({
        email : email.value,
        password : password.value
    });

    if(!isPassEmpty) {
        return;
    }

    var result = account.login({
        email: email.value,
        password: password.value
    });

    var redirectedUrl = "";
    
    result.then((data) => {
        if (data.status != "400") {
            redirectedUrl = mainPageAddress;
            return data.text();
        }
        return data.text();
    }).then((data)=> {

        if(redirectedUrl == "") {
            $("#login_form").appearErrorMessage("email-message");
            $("#login_form").setErrorMessage(`email-message`, `${data}`);
            $("#login_form").appearErrorMessage("password-message");
            $("#login_form").setErrorMessage(`password-message`, `${data}`);
        } else {
            window.location.href = redirectedUrl;
            auth.setJsonToken(data);
        }
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

function isEmptyCheck(arg) {
    var isPass = true;

    if(!formvalidation.isTextValidationCheck(arg.email)) {
        $("#login_form").appearErrorMessage("email-message");
        $("#login_form").setErrorMessage(`email-message`, "이메일을 입력해주세요.");
        isPass = false;
    }
    if(!formvalidation.isTextValidationCheck(arg.password)) {
        $("#login_form").appearErrorMessage("password-message");
        $("#login_form").setErrorMessage(`password-message`, "비밀번호를 입력해주세요.");
        isPass = false;
    }

    return isPass;
}

loginBtn.addEventListener("click", login);