import {
    Auth
} from "../account/Auth.js";
import {
    FormValidation
} from "../validation/formvalidation.js";

const formvalidation = new FormValidation();
const auth = new Auth();

const emailDuplicationBtn = document.querySelector("#email-duplication-button");
const registerBtn = document.querySelector("#register-button");


$("#email").on("blur", function (event) {
    var email = event.target.value;

    if (!formvalidation.isTextValidationCheck(email)) {
        return;
    }

    if (!formvalidation.isEmailValidationCheck(email)) {
        $("#register_form").appearErrorMessage("email-message");
        $("#register_form").setErrorMessage(`email-message`, "Email형식이 맞지 않습니다.");
    } else {
        $("#register_form").disappearErrorMessage("email-message");

    }
})

$("#password").on("blur", function (event) {
    var password = event.target.value;

    if (!formvalidation.isTextValidationCheck(password)) {
        return;
    }

    if (!formvalidation.isPasswordValidationCheck(password)) {
        $("#register_form").appearErrorMessage("password-message");
        $("#register_form").setErrorMessage(`password-message`, "Password 형식이 맞지 않습니다.");
    } else {
        $("#register_form").disappearErrorMessage("password-message");
    }
})

$("#username").on("blur", function (event) {
    var text = event.target.value;

    if (formvalidation.isTextValidationCheck(text)) {
        $("#register_form").disappearErrorMessage("username-message");
    }
})

function register(event) {
    event.preventDefault();
    const url = backEndServerAddress + "/auth/register";
    const email = document.querySelector("#email");
    const id_register = document.querySelector("#username");
    const password_register = document.querySelector("#password");

    var validResult = formvalidation.isRegisterFormCheck("register_form");
    var result = validResult.forEach((data) => {

        if (data.returnCode) {
            return data.message;
        } else {
            $("#register_form").appearErrorMessage(`${data.id}-message`);
            $("#register_form").setErrorMessage(`${data.id}-message`, data.message);
        }
    });

    if (!isCheckEmailDuplication()) {
        $("#register_form").appearErrorMessage("email-message");
        $("#register_form").setErrorMessage(`email-message`, "중복확인을 눌러주세요.");
        return;
    }


    // if (result == "SUCCESS") {
    //     var result = auth.register({
    //         email: email,
    //         password: password
    //     });

    //     result.then((data)=>{
    //         console.log(data);
    //     });
    // }


    // fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         username: `${id_register.value}`,
    //         password: `${password_register.value}`,
    //         email : `${email.value}`,
    //     }),
    // }).then(Response => {
    //     if (Response.status.toString() === "201") {

    //         alert("회원가입 성공");
    //         window.location.href = mainPageAddress;
    //     }

    // }).catch((error)=> {
    //     alert(error);
    //     console.log("서버 연결에 에러가 발생했습니다.");
    // });
}

function emailDuplication(event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;

    if (!formvalidation.isTextValidationCheck(email)) {
        $("#register_form").appearSuccessMessage("email-message");
        $("#register_form").setSuccessMessage(`email-message`, "Email를 입력해주세요.");
        return;
    }

    var result = auth.emailDuplicationCheck({
        email: email
    });

    result.then((data) => {
        emailDuplicationBtn.value = data;

        if (data == "SUCCESS") {
            $("#register_form").appearSuccessMessage("email-message");
            $("#register_form").setSuccessMessage(`email-message`, "사용 가능한 아이디입니다.");
            apprearIconSuccessVisualMessage();
        } else {
            $("#register_form").appearErrorMessage("email-message");
            $("#register_form").setErrorMessage(`email-message`, "사용 불가능한 아이디입니다.");
            apprearIconFailVisualMessage();
        }
    })
}

function isCheckEmailDuplication(value) {
    const result = value;
    var retunValue = true;
    if (result == null || result == "FAILURE" || result == "") {
        apprearIconFailVisualMessage();
        retunValue = false;
    }
    apprearIconSuccessVisualMessage();
    return retunValue;
}

function apprearIconSuccessVisualMessage() {
    $("#email-duplication-button").prop("disabled", true);
    $("#failure").prop("hidden", true);
    $("#failure").removeClass("failure");
    $("#success").prop("hidden", false);
}

function apprearIconFailVisualMessage() {
    $("#success").prop("hidden", true);
    $("#success").removeClass("failure");
    $("#failure").prop("hidden", false);
}

emailDuplicationBtn.addEventListener("click", emailDuplication);
registerBtn.addEventListener("click", register);