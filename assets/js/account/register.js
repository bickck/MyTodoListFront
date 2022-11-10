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
            $("register_form").appearErrorMessage(`${data.id}-message`);
            $("register_form").setErrorMessage(`${data.id}-message`, data.message);
        }
    });


    if(!isCheckEmailDuplication()) {

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
    var result = auth.emailDuplicationCheck({
        email: email
    });

    result.then((data) => {
        emailDuplicationBtn.value = data;

        if(data == "SUCCESS") {

        } else {
            apprearFailVisualMessage();
            
        }
    })
}

function isCheckEmailDuplication() {
    const result = emailDuplicationBtn.value;

    if (result == null || result == "FALURE" || result == "") {
        apprearFailVisualMessage();
        $("#email").foucs();
        return false;
    } else {
        apprearSuccessVisualMessage();
    }
    
    return true;
}

function apprearSuccessVisualMessage() {
    $("#failure").prop("hidden",true);
    $("#failure").removeClass("failure");
    $("#success").prop("hidden",false);
}

function apprearFailVisualMessage() {
    $("#success").prop("hidden",true);
    $("#success").removeClass("failure");
    $("#failure").prop("hidden",false);
}

emailDuplicationBtn.addEventListener("click", emailDuplication);
registerBtn.addEventListener("click", register);