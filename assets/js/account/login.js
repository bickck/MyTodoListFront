import {
    Auth
} from "../account/Auth.js";
import {
    FormValidation
} from "../validation/formvalidation.js";

const loginBtn = document.querySelector("#login_button");

const formvalidation = new FormValidation();
const auth = new Auth();


function login(event) {
    event.preventDefault();

    const url = backEndServerAddress + "/auth/login";
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    var validResult = formvalidation.isLoginFormCheck("login_form");

    console.log(validResult);
    var result = validResult.forEach((data) => {

        if (data.returnCode) {
            return data.message;
        } else {
            $("login_form").appearErrorMessage(`${data.id}-message`);
            $("login_form").setErrorMessage(`${data.id}-message`, data.message);
        }
    });

    if (result == "SUCCESS") {
        var result = auth.login({
            email: email,
            password: password
        });

        result.then((data)=>{
            console.log(data);
        });
    }



    // var result = fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         email: `${email.value}`,
    //         password: `${password.value}`,
    //     }),
    // }).then(Response => Response.text()).then((data)=>{
    //     auth.setJsonToken(data);  
    //     window.location.href = mainPageAddress;
    // }).catch((error)=> {
    //     console.log(error);
    // });
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