import {
    Auth
} from "../account/Auth.js";

const auth = new Auth();
const save_btn = document.querySelector("#save_button");


function todoSave(event) {
    const requestUrl = backEndServerAddress + "/user/todo/manage/save";
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    var isCheckPublic = document.querySelector("#non-public");

    if (isCheckPublic.checked == false) {
        isCheckPublic.value = "public";
    }

    fetch(requestUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization" : auth.getJsonToken(),
        },
        body: JSON.stringify({
            title: `${title}`,
            cotent: `${content}`,
            isChekcPuhlic: `${isCheckPublic}`
        }),
    }).then(Response => {
        if (Response.status.toString() === "200") {
            alert("저장 성공");
            window.location.href = mainPageAddress;
        }

    }).catch((error) => {
        console.log("서버 연결에 에러가 발생했습니다.");
        alert(error);
    });
}

save_btn.addEventListener("click", todoSave);
console.dir(document.querySelector("#todo_save"));

