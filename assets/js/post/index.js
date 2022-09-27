import {
    Post
} from "./Post.js";
import {
    Auth
} from "../account/Auth.js";

import {
    Todo
} from "../todo/todo.js"

const mainTodos = new Todo();
const auth = new Auth();
const post = new Post();
const mainPost = document.querySelector("#main");

function init() {
    console.log("call init function");
    authDisabledCheck();
    requestMainPosts();
}

function requestMainPosts(event) {

    mainTodos.requestMainPosts();

    // event.preventDefault();
    // const url = "";
    // var result = fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({

    //     }),
    // }).then(Response => {
    //     data(Response);

    // }).catch((error) => {
    //     alert("서버 연결에 에러가 발생했습니다.");
    // });
}

function authDisabledCheck() {
    var token = auth.getJsonToken();
    var nonAuthClazz = document.getElementsByClassName("non-auth");
    var authClazz = document.getElementsByClassName("auth");

    if (token == null || token == "undefined") {
        for (var i = 0; i < nonAuthClazz.length; i++) {
            nonAuthClazz[i].style.display = "block";
        }
    } else {
        for (var i = 0; i < authClazz.length; i++) {
            authClazz[i].style.display = "none";
        }
    }
}

init();