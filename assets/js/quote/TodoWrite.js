const loginBtn = document.querySelector("#login_button");


function todoSave(event) {
    event.preventDefault();

    const url = document.querySelector("#login_form").action;
    const id = document.querySelector("#email");
    const password = document.querySelector("#password");

    var result = fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: `${id.value}`,
            password: `${password.value}`,
        }),
    }).then(Response => {
        if (Response.status.toString() === "200") {
            alert("저장 성공");
            auth.setKey(Response);
            window.location.href = "http://127.0.0.1:5500/";
        }

    }).catch((error)=> {
        console.log("서버 연결에 에러가 발생했습니다.");
    });
}

loginBtn.addEventListener("click", login);


console.dir( document.querySelector("#login_form"));