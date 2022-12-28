import {
    TodoApi
} from "../../api/todoapi.js";
import {
    Todo
} from "../../server/todo.js";
import {
    Comment
} from "./../../util/comment.js"

var layer;
const main = document.querySelector("body");
const wrapper = document.querySelector("#wrapper");
const comment = new Comment();
const todoapi = new TodoApi();
const todo = new Todo();


function disableScroll() {
    main.classList.add("stop-scrolling");
    wrapper.classList.add("stop-click");
}

function enableScroll() {
    main.classList.remove("stop-scrolling");
    wrapper.classList.remove("stop-click");

}

function setCommentInLayer(todoId) {

    var result = todoapi.requestTodoCommentsByTodoId({
        id: todoId
    });

    result.then((data) => {
        if (data == null || data.content.length == 0) {
            var arg = {
                title: "데이터가 없어요."
            }

            var section = comment.createCommentElement(arg);
            layer.commentContainer.appendChild(section);
            main.appendChild(layer.commentSection);

        } else {

            for (var i = 0; i < data.numberOfElements; i++) {
                var section = comment.createCommentElement(data.content[i]);
                layer.commentContainer.appendChild(section);
            }
            main.appendChild(layer.commentSection);
        }
    });
}

function openCommentLayer(todoId) {
    disableScroll();
    layer = comment.createCommentLayer({
        id: todoId
    }, addComment, closeCommentLayer);
    setCommentInLayer(todoId);
}

function reloadTodoCommeandData(todoId) {

    layer = comment.createCommentLayer({
        id: todoId
    }, addComment, closeCommentLayer);

    clearCommentList();

    var result = todoapi.requestTodoCommentsByTodoId({
        id: todoId
    });

    result.then((data) => {
        for (var i = 0; i < data.numberOfElements; i++) {
            var section = comment.createCommentElement(data.content[i]);
            layer.commentContainer.appendChild(section);
        }
        main.appendChild(layer.commentSection);

    });
}

function addComment(event) {
    const todo_Id = document.querySelector("#TodoID").getAttribute("todo_id");
    const comment = document.getElementById("comment_form").elements[0].value;

    var result = todo.requestSaveCommentByTodoId({
        id: todo_Id,
        comment: comment
    });

    result.then((data) => {
        if (data == "SUCCESS") {
            reloadTodoCommeandData(todo_Id);
        }
    })
}

function deleteComment() {

}


function clearCommentList(todoId) {
    var childSize = layer.commentContainer.childElementCount;

    for (var i = 0; i < childSize; i++) {
        layer.commentContainer.removeChild(layer.commentContainer.childNodes[i]);
    }
}

function closeCommentLayer(event) {
    enableScroll();
    comment.removeCommentLayer();
}


function setCommentEvent(todoId, comment, commnetContainer) {
    commnetContainer.innerText = comment;
    commnetContainer.addEventListener("click", function () {
        openCommentLayer(todoId);
    });
}

export {
    setCommentEvent
};