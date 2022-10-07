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
    userDetailInfo();
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

    const userInfoArea = document.querySelector(".user");
    //    const userIntroData = "REQUEST SERVER USER INTRO";
    const url = backEndServerAddress + "/user/api/intro";
    // fetch(url, {
    //     method: 'GET',
    //     mode: 'no-cors',
    //     headers: {
    //         // "Access-Control-Allow-Origin" : "http://localhost:8080/",
    //         "Content-Type": "application/json",
    //         "Authorization": auth.getJsonToken(),
    //     },
    // }).then((response) => {
    //     response.json()
    // }).catch((error) => {
    //     console(error);
    // });

    console.log(auth.getJsonToken());
    fetch(url, {
            method: 'GET', // 또는 'PUT'
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth.getJsonToken(),
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('성공:', data);
        })
        .catch((error) => {
            console.error('실패:', error);
        });

    //user.postUserIntroData(userIntroData,userInfoArea);

}

init();