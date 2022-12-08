import {
    Auth
} from "../account/Auth.js";
import {
    Account
} from "../server/account.js"
import {
    FormValidation
} from "../validation/formvalidation.js";


const formvalidation = new FormValidation();
const auth = new Auth();
const account = new Account();

const emailDuplicationBtn = document.querySelector("#email-duplication-button");
const registerBtn = document.querySelector("#register-button");

window.onload = function init() {

}

$("#email").on("change",function(event) {
    
    const passValue = emailDuplicationBtn.value;

    if(passValue == "") {
        return;
    }

    if(passValue == "SUCCESS") {
        emailDuplicationBtn.value ="";
        apprearIconFailVisualMessage();
        
        
    }
    if(passValue == "FAILURE") {
        emailDuplicationBtn.value ="";
        isVisualErrorMessage("email", "중복확인을 눌러주세요");
    }
    console.log(emailDuplicationBtn);
    console.log(passValue);
});

// $("#password").on("change",function(event) {
//     console.log("password Change");
// });

// $("#username").on("change",function(event) {
//     console.log("username Change");
// });

$("#email").on("blur", function (event) {
    var email = event.target.value;

    if (!formvalidation.isTextValidationCheck(email)) {
        return;
    }

    if ($("#email").hasClass("FAILURE")) {
        $("#email").removeClass("FAILURE");
    }

    if (!formvalidation.isEmailValidationCheck(email)) {
        $("#register_form").appearErrorMessage("email-message");
        $("#register_form").setErrorMessage(`email-message`, "Email 형식이 맞지 않습니다.");
    } else {
        $("#register_form").disappearErrorMessage("email-message");
        $("#email").addClass("SUCCESS");
    }
})

$("#password").on("blur", function (event) {
    var password = event.target.value;

    if (!formvalidation.isTextValidationCheck(password)) {
        return;
    }

    if ($("#password").hasClass("FAILURE")) {
        $("#password").removeClass("FAILURE");
    }

    if (!formvalidation.isPasswordValidationCheck(password)) {
        $("#register_form").appearErrorMessage("password-message");
        $("#register_form").setErrorMessage(`password-message`, "Password 형식이 맞지 않습니다.");
    } else {
        $("#register_form").disappearErrorMessage("password-message");
        $("#password").addClass("SUCCESS");
    }
})

$("#username").on("blur", function (event) {
    var text = event.target.value;

    if (!formvalidation.isTextValidationCheck(text)) {
        return;
    }

    if ($("#username").hasClass("FAILURE")) {
        $("#username").removeClass("FAILURE");
    }

    if (!formvalidation.isTextValidationCheck(text)) {
        $("#register_form").appearErrorMessage("username-message");
        $("#register_form").setErrorMessage(`username-message`, "내용을 입력해주세요.");
    } else {
        $("#register_form").disappearErrorMessage("username-message");
        $("#username").addClass("SUCCESS");
    }
})

function register(event) {
    event.preventDefault();

    const email = document.querySelector("#email");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const isCheckEmailDuplicationButton = document.querySelector("#email-duplication-button");

    var emptyPass = registerEmptyValidationChecking({
        email: email,
        username: username,
        password: password
    });


    if (!emptyPass) {
        return;
    }

    var regPass = registerExpRegValidationChecking({
        email: email,
        username: username,
        password: password
    });

    if (!regPass) {
        return;
    }

    var emailDuplicationPass = isCheckEmailDuplication({
        isCheckEmailDuplication: isCheckEmailDuplicationButton
    })

    if (!emailDuplicationPass) {
        return;
    }


    popupOpen("회원가입을 하시겠습니까?", function register() {

        var result = account.register({
            email: email.value,
            password: password.value,
            username: username.value
        });

        result.then((data) => {
            console.log(data);
        });
    });
}

function registerEmptyValidationChecking(arg) {
    var isPass = true;
    const username = arg.username.value;
    const email = arg.email.value;
    const password = arg.password.value;

    if (!formvalidation.isTextValidationCheck(username)) {
        var usernameNullErrorMessage = "Username를 입력해주세요.";
        isVisualErrorMessage(arg.username.id, usernameNullErrorMessage);
        isPass = false;
    }
    if (!formvalidation.isTextValidationCheck(email)) {
        var emailNullErrorMessage = "Email를 입력해주세요.";
        isVisualErrorMessage(arg.email.id, emailNullErrorMessage);
        isPass = false;
    }
    if (!formvalidation.isTextValidationCheck(password)) {
        var passwordNullErrorMessage = "Password 입력해주세요.";
        isVisualErrorMessage(arg.password.id, passwordNullErrorMessage);
        isPass = false;
    }

    return isPass;
}

function registerExpRegValidationChecking(arg) {
    var isPass = true;
    const email = arg.email.value;
    const password = arg.password.value;

    if (!formvalidation.isEmailValidationCheck(email)) {
        var emailRegExpErrorMessage = "Email 형식이 맞지 않습니다.";
        isVisualErrorMessage(arg.email.id, emailRegExpErrorMessage);
        isPass = false;
    }

    if (!formvalidation.isPasswordValidationCheck(password)) {
        var passwordRegExpErrorMessage = "Password 형식이 맞지 않습니다.";
        isVisualErrorMessage(arg.password.id, passwordRegExpErrorMessage);
        isPass = false;
    }

    return isPass;
}

function emailDuplication(event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;

    if (!formvalidation.isTextValidationCheck(email)) {
        isVisualErrorMessage("email", "Email를 입력해주세요.");
        return;
    }

    var result = account.emailDuplicationCheck({
        email: email
    });

    result.then((data) => {

        if (data == "SUCCESS") {
            emailDuplicationBtn.value = data;
            isVisualSuccessMessage("email", "사용 가능한 아이디입니다.");
            apprearIconSuccessVisualMessage();
        } else {
            emailDuplicationBtn.value = data;
            isVisualErrorMessage("email", "사용 불가능한 아이디입니다.");
            apprearIconFailVisualMessage();
        }
    })
}

function isCheckEmailDuplication(arg) {
    const result = arg.isCheckEmailDuplication.value;
    var retunValue = true;

    console.log(result);

    if(result == "FAILURE") {
        isVisualErrorMessage("email", "사용 불가능한 아이디입니다.");
        apprearIconFailVisualMessage();
        retunValue = false;
    }

    if (result == null || result == "") {
        apprearIconFailVisualMessage();
        isVisualErrorMessage("email", "중복확인을 눌러주세요");
        retunValue = false;
    } 
    if(result == "SUCCESS") {
        isVisualSuccessMessage("email", "사용 가능한 아이디입니다.");
        apprearIconSuccessVisualMessage();
    }
    return retunValue;
}

function isVisualSuccessMessage(erroContainerId, message) {
    $("register_form").appearSuccessMessage(`${erroContainerId}-message`);
    $("register_form").setSuccessMessage(`${erroContainerId}-message`, message);
}

function isVisualErrorMessage(erroContainerId, message) {
    $("register_form").appearErrorMessage(`${erroContainerId}-message`);
    $("register_form").setErrorMessage(`${erroContainerId}-message`, message);
}


function apprearIconSuccessVisualMessage() {
    $("#email-duplication-button").prop("disabled", true);
    $("#failure").prop("hidden", true);
    $("#failure").removeClass("failure");
    $("#success").prop("hidden", false);
}

function apprearIconFailVisualMessage() {
    $("#email-duplication-button").prop("disabled", false);
    $("#success").prop("hidden", true);
    $("#success").removeClass("failure");
    $("#failure").prop("hidden", false);
}

emailDuplicationBtn.addEventListener("click", emailDuplication);
registerBtn.addEventListener("click", register);