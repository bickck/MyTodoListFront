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

const todo = new Todo();
const auth = new Auth();
const postgenerator = new PostGenerator();

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

/**
 * 
 */

function refreshEvent() {

    files = document.querySelectorAll(".views > li > .files");

    for (var i = 0; i < viewFileList.length; i++) {
        viewFileList[i].addEventListener("change", tempImageSave);
    }

    for (var i = 0; i < labelList.length; i++) {

        if(files[i].files.length != 0){
            labelList[i].addEventListener("mouseover", previewMouseOver);
            labelList[i].addEventListener("mouseout", previewMouseOut);
            labelList[i].addEventListener("click", deletePreviewImage);
        }
        //labelList[i].addEventListener("mouseover", imageHover);
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
    input.removeAttribute("disabled");
    console.dir(input);
}

/**
 * 
 * @param {*} event 
 */

function previewMouseOver(event) {
    var input = event.target.previousElementSibling;
    input.setAttribute("disabled","");
}


/**
 * 
 * @param {*} event 
 */

function tempImageSave(event) {

    labelList = document.querySelectorAll(".views > li");

    // Next 이벤트 생성
    currImageCount++;
    if (currImageCount < imageSaveLimit) {
        const imageContainer = postgenerator.createPreViewImageContainer();
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

    imageView.removeChild(event.target.parentElement);

    imageCount.innerText = --currImageCount;

    if(currImageCount == 0) {
        const imageContainer = postgenerator.createPreViewImageContainer();
        imageView.appendChild(imageContainer);
        viewFileList = document.querySelectorAll(".files");
        refreshEvent();
    }
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

    const isPublish = document.querySelector("#isPublish");

    var arg = {
        title: document.querySelector("#title").value,
        content: document.querySelector("#content").value,
        isPublish: isPublish.value,
        files: file.files
    }

    if (isPublish.checked == false) {
        arg.isPublish = "publish";
    }

    var result = todo.requestUserTodoInsert(arg);

    result.then((data) => {
        console.log(data);
    });
}

function todoUpdate() {
    const requestUrl = backEndServerAddress + "/user/todo/manage/update";
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    var isCheckPublic = document.querySelector("#non-public");

    var arg = {
        url: backEndServerAddress + "/user/todo/manage/update",
        title: document.querySelector("#title").value,
        content: document.querySelector("#content").value,
        isCheckPublic: document.querySelector("#non-public")
    }

    if (isCheckPublic.checked == false) {
        isCheckPublic.value = "public";
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
