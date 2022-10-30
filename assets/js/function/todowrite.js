/**
 * 
 */


import {
    Auth
} from "../account/Auth.js";

import{
    Todo
} from "../server/Todo.js"

const todo = new Todo();
const auth = new Auth();

const save_btn = document.querySelector("#save_button");
const update_btn = document.querySelector("#update_button");
const delete_btn = document.querySelector("#delete_button");

window.onload = function init() {
    
}

function todoSave() {
    const requestUrl = backEndServerAddress + "/user/todo/manage/save";
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    var isCheckPublic = document.querySelector("#non-public");

    var arg = {
        url : backEndServerAddress + "/user/todo/manage/save",
        title : document.querySelector("#title").value,
        content : document.querySelector("#content").value,
        isCheckPublic : document.querySelector("#non-public")
    }

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
            content: `${content}`,
            isChekcPuhlic: `${isCheckPublic.value}`
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

function todoUpdate() {
    const requestUrl = backEndServerAddress + "/user/todo/manage/update";
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    var isCheckPublic = document.querySelector("#non-public");

    var arg = {
        url : backEndServerAddress + "/user/todo/manage/update",
        title : document.querySelector("#title").value,
        content : document.querySelector("#content").value,
        isCheckPublic : document.querySelector("#non-public")
    }

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
            content: `${content}`,
            isChekcPuhlic: `${isCheckPublic.value}`
        }),
    }).then(Response => {
        if (Response.status.toString() === "200") {
            alert("수정 성공");
            window.location.href = mainPageAddress;
        }

    }).catch((error) => {
        console.log("서버 연결에 에러가 발생했습니다.");
        alert(error);
    });
}

function todoDelete() {

    const id = document.querySelector("#post_id").value;
    const requestUrl = backEndServerAddress + `/user/todo/manage/delete/${id}`;
    
    var arg = {
        url : requestUrl
    }

    fetch(requestUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization" : auth.getJsonToken(),
        },
        body: JSON.stringify({
            title: `${title}`,
            content: `${content}`,
            isChekcPuhlic: `${isCheckPublic.value}`
        }),
    }).then(Response => {
        if (Response.status.toString() === "200") {
            alert("삭제 성공");
            window.location.href = mainPageAddress;
        }

    }).catch((error) => {
        console.log("서버 연결에 에러가 발생했습니다.");
        alert(error);
    });
}

if(delete_btn != null) {
    delete_btn.addEventListener("click",todoDelete);
}
if(update_btn != null) {
    update_btn.addEventListener("click", todoUpdate);
}
if(save_btn != null) {
    save_btn.addEventListener("click", todoSave);
}

