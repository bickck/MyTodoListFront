/**
 * 
 */


import {
    Post
} from "../generator/post.js";
import {
    Auth
} from "../account/auth.js";

// import {
//     Todo
// } from "../post/todo.js";

import {
    Users
} from "../server/users.js";



// const mainTodos = new Todo();
const auth = new Auth();
const post = new Post();
const user = new Users();


const mainPost = document.querySelector("#main");

window.onload = function init(event) {
    event.preventDefault();
    requestMainPosts();
    if (auth.getJsonToken == null) {
        userDetailInfo();
    }
    //userDetailInfo();
}


function requestMainPosts() {
    const url = backEndServerAddress + "/todo/api/mainpost";
    fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(Response => Response.json())
        .then((data) => {

            console.log(data);
            if (data != null) {
                //post.createMainPost(data);
            }
            // no exsist post

            var postResult = post.createMainPost(data);
            mainPost.appendChild(postResult);
        })
        .catch((error) => {
            //console.log("서버 연결에 에러가 발생했습니다.");
            console.error(error);
        });
}

function userDetailInfo() {
    const url = backEndServerAddress + "/user/api/intro";
    const introSection = document.querySelector("#intro.auth");
    fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${auth.getJsonToken()}`,
            },
        })
        .then((Response) => Response.json())
        .then((data) => {
            console.log(data);
            postUserIntroData(data, introSection);
        })
        .catch((error) => {
            // console.log("서버 연결에 에러가 발생했습니다.");
            console.error(error);
        });
}

function postUserIntroData(data, introSection) {
    const username = document.querySelector("#username");
    const userComment = document.querySelector("#usercomment");

    username.innerText = data.username;
    userComment.innerText = data.introComment;
}