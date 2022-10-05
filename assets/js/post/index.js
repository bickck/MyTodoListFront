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
    // requestMainPosts();
    // userDetailInfo();
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