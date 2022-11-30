/**
 * 
 */

import {
    Auth
} from "./../account/Auth.js";

import {
    Todo
} from "./../server/Todo.js";

import {
    PostGenerator
} from "./../generator/post.js";

import {
    FormValidation
} from "./../validation/formvalidation.js";

import {
    ImagePreviewer
} from "./../util/imgPreviwer.js";

const todo = new Todo();
const auth = new Auth();
const postgenerator = new PostGenerator();
const formvalidation = new FormValidation();
const imagePreviewer = new ImagePreviewer("views","image-count");

const save_btn = document.querySelector("#save_button");
const delete_btn = document.querySelector("#delete_button");
const imageCount = document.querySelector(".image-count");


window.onload = function init() {

    imagePreviewer.startImagePreviewerCreator();

}


$("#title").on("blur", function (event) {
    var title = event.target.value;

    if (!formvalidation.isTextValidationCheck(title)) {
        return;
    }

    if (!formvalidation.isTextValidationCheck(title)) {
        $("#todo_form").appearErrorMessage("title-message");
        $("#todo_form").setErrorMessage(`title-message`, "Title를 입력해주세요.");
    } else {
        $("#todo_form").disappearErrorMessage("title-message");
    }
})

$("#content").on("blur", function (event) {
    var content = event.target.value;

    if (!formvalidation.isTextValidationCheck(content)) {
        return;
    }


    if (!formvalidation.isTextValidationCheck(content)) {
        $("#todo_form").appearErrorMessage("content-message");
        $("#todo_form").setErrorMessage(`content-message`, "Content를 입력해주세요.");
    } else {
        $("#todo_form").disappearErrorMessage("content-message");
    }
})

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


    for (var i = 0; i < file.length; i++) {
        if (file[i].files.length != 0) {
            argFiles[i] = file[i].files;
        }
    }

    var arg = {
        title: title.value,
        content: content.value,
        isPublish: isPublish.value,
        files: argFiles
    }

    if (isPublish.checked == false) {
        arg.isPublish = "publish";
    }
    popupOpen("저장하시겠습니까?", function () {
        var result = todo.requestUserTodoInsert(arg);

        result.then((data)=>{
            if(data == "SUCCESS") {
                popupClose();
                //window.location.href = mainPageAddress;
            }
        })
    });
}

function todoDelete() {

    const id = document.querySelector("#post_id").value;
    const requestUrl = backEndServerAddress + `/user/todo/manage/delete/${id}`;

    popupOpen("삭제하시겠습니까?");
    var arg = {
        url: requestUrl
    }
}

if (delete_btn != null) {
    delete_btn.addEventListener("click", todoDelete);
}

if (save_btn != null) {
    save_btn.addEventListener("click", todoSave);
}
