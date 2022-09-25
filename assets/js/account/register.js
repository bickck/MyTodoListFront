const email = document.querySelector("#email");
const password = document.querySelector("#password");

const registerBtn = document.querySelector("#");

function register(event) {
    event.preventDefault();
    const url = register.action;
    const id_register = document.querySelector("#register-form #username");
    const password_register = document.querySelector("#register-form #userpassword");
    var result = fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: `${id_register.value}`,
            password: `${password_register.value}`,
        }),
    }).then(Response => {
        if (Response.status.toString() === "200") {
            alert("저장 성공");
            window.location.href = "http://127.0.0.1:5501/";
        }

    }).catch((error)=> {
        console.log("서버 연결에 에러가 발생했습니다.");
    });
}

registerBtn.addEventListener("click", register);