/**
 * 
 */

import {
    PostGenerator
} from "../generator/post.js";
import {
    Auth
} from "../account/auth.js";
import {
    Users
} from "../server/users.js";
import {
    TodoApi
} from "../api/todoapi.js";
import {
    QuoteApi
} from "../api/quoteapi.js";

import {
    NonDataInjector
} from "../util/page.js"


// const mainTodos = new Todo();
const auth = new Auth();
const post = new PostGenerator();
const user = new Users();
const todoapi = new TodoApi();
const quoteapi = new QuoteApi();
const nonDataInjector = new NonDataInjector();


const mainPost = document.querySelector("#main");
const miniPosts = document.querySelector(".mini-posts");
const postLists = document.querySelector(".posts")

window.onload = function init(event) {
    event.preventDefault();
    // var main = nonDataInjector.createNonMainPost();
    // var miniPost = nonDataInjector.createNonMiniPost();
    // var postList = nonDataInjector.createNonPosts();

    // mainPost.appendChild(main)
    // miniPosts.appendChild(miniPost);
    // postLists.appendChild(postList);
    if (auth.getJsonToken() != null) {
        userDetailInfo();
    }
    requestMainPosts();
    //userDetailInfo();
}

function requestMainPosts() {
    const url = backEndServerAddress + "/todo/api/mainpost";

    var mainTodos = todoapi.requestMainPosts();

    mainTodos.then((data) => {

        if (data == null || data == "undefined") {
            mainPost.appendChild(nonDataInjector.createNonMainPost())
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            mainPost.appendChild(post.createMainPost(content));

            if(content.imgCount > 0) {
                // request img 
            }
        }

        console.log(data);


    });
    // fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     .then(Response => Response.json())
    //     .then((data) => {

    //         console.log(data);
    //         if (data != null) {
    //             //post.createMainPost(data);
    //         }
    //         // no exsist post

    //         var postResult = post.createMainPost(data);
    //         mainPost.appendChild(postResult);
    //     })
    //     .catch((error) => {
    //         //console.log("서버 연결에 에러가 발생했습니다.");
    //         console.error(error);
    //     });
}

function userDetailInfo() {
    const url = backEndServerAddress + "/user/api/intro";
    const introSection = document.querySelector("#intro.auth");

    var arg = {
        authorization: `${auth.getJsonToken()}`,
        url: url
    }

    var userDetails = user.requestUserDetails(arg);

    userDetails.then((data) => {
        console.log(data);
        postUserIntroData(data, introSection);
    });
    // fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "authorization": `${auth.getJsonToken()}`,
    //         },
    //     })
    //     .then((Response) => Response.json())
    //     .then((data) => {
    //         console.log(data);
    //         postUserIntroData(data, introSection);
    //     })
    //     .catch((error) => {
    //         // console.log("서버 연결에 에러가 발생했습니다.");
    //         console.error(error);
    //     });
}

function postUserIntroData(data, introSection) {
    const username = document.querySelector("#username");
    const userComment = document.querySelector("#usercomment");

    username.innerText = data.username;
    userComment.innerText = data.introComment;
}