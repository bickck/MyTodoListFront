const registerBtn = document.querySelector("#register_button");

function register(event) {
    event.preventDefault();
    const url = backEndServerAddress + "/auth/register";
    const email = document.querySelector("#email");
    const id_register = document.querySelector("#username");
    const password_register = document.querySelector("#password");
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: `${id_register.value}`,
            password: `${password_register.value}`,
            email : `${email.value}`,
        }),
    }).then(Response => {
        if (Response.status.toString() === "201") {
            
            alert("회원가입 성공");
            window.location.href = mainPageAddress;
        }

    }).catch((error)=> {
        alert(error);
        console.log("서버 연결에 에러가 발생했습니다.");
    });
}
registerBtn.addEventListener("click", register);