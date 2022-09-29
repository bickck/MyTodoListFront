import {
    Post
} from "./Post.js";
import {
    Auth
} from "../account/Auth.js";

import {
    Todo
} from "../server/todo.js"

import {
    User
} from "./User.js"

const mainTodos = new Todo();
const auth = new Auth();
const post = new Post();
const user = new User();
const mainPost = document.querySelector("#main");

function init() {
   
    //authDisabledCheck();
    //requestMainPosts();
    userDetailInfo();
}

function requestMainPosts(event) {
    event.preventDefault();
    mainTodos.requestMainPosts();
    userDetailInfo();
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
function requestUserDetails() {

}

function authDisabledCheck() {
    var token = auth.getJsonToken();
    var nonAuthClazz = document.getElementsByClassName("non-auth");
    var authClazz = document.getElementsByClassName("auth");

    if (token == null || token == "undefined") {
        for (var i = 0; i < nonAuthClazz.length; i++) {
            nonAuthClazz[i].style.display = "block";
        }
        for (var i = 0; i < authClazz.length; i++) {
            authClazz[i].style.display = "none";
        }
    } else {
        for (var i = 0; i < nonAuthClazz.length; i++) {
            nonAuthClazz[i].style.display = "none";
        }
        for (var i = 0; i < authClazz.length; i++) {
            authClazz[i].style.display = "block";
        }
    }
}

function userDetailInfo() {
    const userInfoArea = document.querySelector(".user");
    const userIntroData = "REQUEST SERVER USER INTRO";
    user.postUserIntroData(userIntroData,userInfoArea);

}

init();