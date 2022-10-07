import { Auth } from "../account/Auth.js";

const loginBtn = document.querySelector("#login_button");

const auth = new Auth(); 

function login(event) {
    event.preventDefault();

    const url = backEndServerAddress + "/auth/login";
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    var result = fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: `${email.value}`,
            password: `${password.value}`,
        }),
    }).then(Response => Response.text()).then((data)=>{
        console.log(data);
        auth.setJsonToken(data);  
        window.location.href = mainPageAddress;
    }).catch((error)=> {
        console.log(error);
        console.log("서버 연결에 에러가 발생했습니다.");
    });
}

loginBtn.addEventListener("click", login);