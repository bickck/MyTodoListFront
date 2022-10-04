import {
    Post
} from "./Post.js";
import {
    Auth
} from "../account/Auth.js";

import {
    Todo
} from "../server/Todo.js"

import {
    User
} from "./User.js"


const mainTodos = new Todo();
const auth = new Auth();
const post = new Post();
const user = new User();
const mainPost = document.querySelector("#main");

function init() {

    // authDisabledCheck();
    // requestMainPosts();
    // userDetailInfo();
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

function requestMainPosts(event) {
    //event.preventDefault();
    const url = "/todo/api/mainpost";
    var result = fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },

    }).then(Response => {

        console.log(Response);
        //post.createMainPost(Response);

    }).catch((error) => {
        alert("서버 연결에 에러가 발생했습니다.");
        console.log(error);
    });
}

function userDetailInfo(event) {
    //event.preventDefault();
    const userInfoArea = document.querySelector(".user");
    //    const userIntroData = "REQUEST SERVER USER INTRO";
    const url = "/user/api/intro";
    var result = fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "authorization": auth.getJsonToken(),
        },
        // body: JSON.stringify({

        // }),
    }).then(Response => {
        console.log(Response);
        user.postUserIntroData(Response, userInfoArea);

    }).catch((error) => {
        alert("서버 연결에 에러가 발생했습니다.");
    });
    //user.postUserIntroData(userIntroData,userInfoArea);

}

init();