
import {
    ImageApi
} from "../api/imageapi.js";

import {
    TodoApi
} from "./../api/todoapi.js";

import {
    Todo
} from "./../server/Todo.js";

import {
    ImagePreviewer
} from "./../util/imgPreviwer.js";

import {
    FormValidation
} from "./../validation/formvalidation.js";

const update_btn = document.querySelector("#update_button");
const imagePreviewer = new ImagePreviewer("views", "image-count");
const formvalidation = new FormValidation();
const todoapi = new TodoApi();
const imageapi = new ImageApi();
const todo = new Todo();

const query = window.location.search;


window.onload = function init() {
    const id = getQueryId(query);
    loadTodoDetailById(id);
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


function getQueryId(query) {
    const id = new URLSearchParams(query).get("todoid");
    return id;
}


function loadTodoDetailById(id) {

    var arg = {
        id: id
    }

    var todoDetails = todoapi.requestUserTodoByTodoId(arg);

    todoDetails.then((data) => {
        setTodoAtForm(data);
    });
}

function setTodoAtForm(arg) {

    const title = document.querySelector("#title");
    const content = document.querySelector("#content");
    const isPublish = document.querySelector("#isPublish");

    title.setAttribute("value", arg.title);
    content.setAttribute("value", arg.content);
    content.innerText = arg.content;

    if (arg.isPublish == "PRIVATE" || arg.isPublish == "private") {
        isPublish.setAttribute("checked", true);
    }
    if(arg.postImgCount == 0) {
        imagePreviewer.startImagePreviewerCreator();
    }

    if (arg.postImgCount != 0) {

        const img = imageapi.requestTodoImageById({
            id: arg.id
        });

        img.then((data) => {
            var urls = [];

            for (var i = 0; i < data.length; i++) {
                urls[i] = backEndServerAddress + "/image/api/source" + `/${data[i].fileName}` + `/${data[i].originalFileName}`;
            }
            imagePreviewer.setImagePreview(urls);
        });
    }

}

function todoUpdate() {
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    var isPublish = document.querySelector("#isPublish");

    var validResult = formvalidation.isTodoFormCheck("todo_form");

    validResult.forEach((data) => {
        if (data.returnCode) {
            return data.message;
        } else {
            $("#todo_form").appearErrorMessage(`${data.id}-message`);
            $("#todo_form").setErrorMessage(`${data.id}-message`, data.message);
        }
    });

    if (isPublish.checked == false) {
        isPublish.isPublish = "publish";
    }

    var files = imagePreviewer.getImageList();

    var arg = {
        id : getQueryId(query),
        title: title,
        content: content,
        isPublish: isPublish.value,
        files: files
    }

    if (isPublish.checked == false) {
        arg.isPublish = "publish";
    }

    popupOpen("수정하시겠습니까?", function () {
        var result = todo.requestUserTodoUpdate(arg);
        result.then((data) => {
            if(data == "SUCCESS") {

            }
            console.log(data);
        });
    });
}

update_btn.addEventListener("click", todoUpdate);
