/**
 * 
 */


import {
    Auth
} from "./../account/Auth.js";

import {
    Todo
} from "./../server/Todo.js"

import {
    PostGenerator
} from "./../generator/post.js";

import {
    FormValidation
} from "../validation/formvalidation.js";

const todo = new Todo();
const auth = new Auth();
const postgenerator = new PostGenerator();
const formvalidation = new FormValidation();

var imageView = document.querySelector(".views");
var files;

const save_btn = document.querySelector("#save_button");
const update_btn = document.querySelector("#update_button");
const delete_btn = document.querySelector("#delete_button");
const imageCount = document.querySelector(".image-count");

var currImageCount = 0;
const imageSaveLimit = 2;

var viewFileList;
var labelList;

window.onload = function init() {

    const imageContainer = postgenerator.createPreViewImageContainer(1);
    imageView.appendChild(imageContainer);

    viewFileList = document.querySelectorAll(".files");
    labelList = document.querySelectorAll(".views > li");

    refreshEvent();
}

$("#title").on("blur", function (event) {
    var title = event.target.value;

    if (!formvalidation.isTextValidationCheck(title)) {
        $("#todo_form").appearErrorMessage("title-message");
        $("#todo_form").setErrorMessage(`title-message`, "Title를 입력해주세요.");
    } else {
        $("#todo_form").disappearErrorMessage("title-message");
    }

    // if (!formvalidation.isEmailValidationCheck(email)) {
    //     $("#todo_form").appearErrorMessage("title-message");
    //     $("#todo_form").setErrorMessage(`title-message`, "Email형식이 맞지 않습니다.");
    // } else {
    //     $("#todo_form").disappearErrorMessage("title-message");

    // }
})

$("#content").on("blur", function (event) {
    var content = event.target.value;

    if (!formvalidation.isTextValidationCheck(content)) {
        $("#todo_form").appearErrorMessage("content-message");
        $("#todo_form").setErrorMessage(`content-message`, "Content를 입력해주세요.");
    } else {
        $("#todo_form").disappearErrorMessage("content-message");
    }

    // if (!formvalidation.isEmailValidationCheck(email)) {
    //     $("#todo_form").appearErrorMessage("content-message");
    //     $("#todo_form").setErrorMessage(`content-message`, "Email형식이 맞지 않습니다.");
    // } else {
    //     $("#todo_form").disappearErrorMessage("content-message");

    // }
})



function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function uuidv4_4() {

    return uuidv4().replace("-", "").substring(0, 4);
}

/**
 * 
 */

function refreshEvent() {

    files = document.querySelectorAll(".views > li > .files");

    for (var i = 0; i < viewFileList.length; i++) {
        viewFileList[i].addEventListener("change", tempImageSave);
    }

    for (var i = 0; i < labelList.length; i++) {

        if (files[i].files.length != 0 && files != "undefined") {
            labelList[i].addEventListener("mouseover", previewMouseOver);
            labelList[i].addEventListener("mouseout", previewMouseOut);
            labelList[i].addEventListener("click", deletePreviewImage);
        }
    }
}

/**
 * 
 * @param {*} event 
 */

function deletePreviewImage(event) {
    previewImageDelete(event);
}

/**
 * 
 * @param {*} event 
 */

function previewMouseOut(event) {
    var input = event.target.previousElementSibling;
    if (input != null) {
        input.removeAttribute("disabled");
    }
}

/**
 * 
 * @param {*} event 
 */

function previewMouseOver(event) {
    var input = event.target.previousElementSibling;
    if (input != null) {
        input.setAttribute("disabled", "");
    }
}


/**
 * 
 * @param {*} event 
 */

function tempImageSave(event) {

    console.log(event);
    labelList = document.querySelectorAll(".views > li");

    // Next 이벤트 생성
    currImageCount++;
    if (currImageCount < imageSaveLimit) {
        const imageContainer = postgenerator.createPreViewImageContainer(uuidv4_4());
        imageView.appendChild(imageContainer);

        viewFileList = document.querySelectorAll(".files");
    }

    refreshEvent();

    var currLabel = event.target.nextElementSibling;
    var currInput = event.target;

    // 이미지 뷰어 
    imagePreviewer(currInput, currLabel);

    // 현재 이미지 개수
    imageCount.innerText = currImageCount;
}


/**
 * 
 * @param {*} event 
 */

function previewImageDelete(event) {

    // console.log("삭제 이벤트 발생");
    // console.log(event);
    imageCount.innerText = --currImageCount;
    imageView.removeChild(event.target.parentElement);
    const viewChildCount = document.querySelector(".views").childElementCount;
    if (currImageCount == 0 && viewChildCount < 1) {
        const imageContainer = postgenerator.createPreViewImageContainer(uuidv4_4());
        imageView.appendChild(imageContainer);
        viewFileList = document.querySelectorAll(".files");
    }

    refreshEvent();
}

/**
 * 
 * @param {*} arg 
 */

function imagePreviewer(input, label) {

    if (input.file || input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {

            // label.style.backgroundImage = `${e.target.result}`;
            label.style.cssText = `
                background-image: url(${e.target.result});
                background-size: cover;
                background-repeat: no-repeat;
            `;
        }
        reader.readAsDataURL(input.files[0]);
    }
}



function todoSave() {

    var argFiles = [];
    const title = document.querySelector("#title");
    const content = document.querySelector("#content");
    const isPublish = document.querySelector("#isPublish");
    const file = document.querySelectorAll(".files");


    var validResult = formvalidation.isTodoFormCheck("todo_form")

    validResult.forEach((data) => {
        if (data.returnCode) {
            return data.message;
        } else {
            $("#todo_form").appearErrorMessage(`${data.id}-message`);
            $("#todo_form").setErrorMessage(`${data.id}-message`, data.message);
        }
    })
   

    // for (var i = 0; i < file.length; i++) {
    //     if(file[i].files.length != 0) {
    //         argFiles[i] = file[i].files;
    //     }
    // }
    // var arg = {
    //     title: title.value,
    //     content: content.value,
    //     isPublish: isPublish.value,
    //     files: argFiles
    // }

    // if (isPublish.checked == false) {
    //     arg.isPublish = "publish";
    // }

    // var result = todo.requestUserTodoInsert(arg);

    // result.then((data) => {
    //     console.log(data);
    // });
}

function todoUpdate() {
    const requestUrl = backEndServerAddress + "/user/todo/manage/update";
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    var isPublish = document.querySelector("#non-public");

    var arg = {
        title: document.querySelector("#title").value,
        content: document.querySelector("#content").value,
        isPublish: isPublish.value
    }

    if (arg.isPublish.checked == false) {
        arg.isPublish.value = "public";
    }

    // fetch(requestUrl, {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json",
    //         "authorization" : auth.getJsonToken(),
    //     },
    //     body: JSON.stringify({
    //         title: `${title}`,
    //         content: `${content}`,
    //         isChekcPuhlic: `${isCheckPublic.value}`
    //     }),
    // }).then(Response => {
    //     if (Response.status.toString() === "200") {
    //         alert("수정 성공");
    //         window.location.href = mainPageAddress;
    //     }

    // }).catch((error) => {
    //     console.log("서버 연결에 에러가 발생했습니다.");
    //     alert(error);
    // });
}

function todoDelete() {

    const id = document.querySelector("#post_id").value;
    const requestUrl = backEndServerAddress + `/user/todo/manage/delete/${id}`;

    var arg = {
        url: requestUrl
    }

    // fetch(requestUrl, {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json",
    //         "authorization" : auth.getJsonToken(),
    //     },
    //     body: JSON.stringify({
    //         title: `${title}`,
    //         content: `${content}`,
    //         isChekcPuhlic: `${isCheckPublic.value}`
    //     }),
    // }).then(Response => {
    //     if (Response.status.toString() === "200") {
    //         alert("삭제 성공");
    //         window.location.href = mainPageAddress;
    //     }

    // }).catch((error) => {
    //     console.log("서버 연결에 에러가 발생했습니다.");
    //     alert(error);
    // });
}

if (delete_btn != null) {
    delete_btn.addEventListener("click", todoDelete);
}
if (update_btn != null) {
    update_btn.addEventListener("click", todoUpdate);
}
if (save_btn != null) {
    save_btn.addEventListener("click", todoSave);
}
