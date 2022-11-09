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

import{
    ImageApi
} from "../api/imageapi.js";

import {
    NonDataInjector
} from "../util/page.js"


// const mainTodos = new Todo();
const auth = new Auth();
const post = new PostGenerator();
const user = new Users();
const todoapi = new TodoApi();
const quoteapi = new QuoteApi();
const imageapi = new ImageApi();
const nonDataInjector = new NonDataInjector();


const mainPost = document.querySelector("#main");
const miniPosts = document.querySelector(".mini-posts");
const postLists = document.querySelector(".posts")

window.onload = function init(event) {
    event.preventDefault();

    if (auth.getJsonToken() != null) {
        userDetailInfo();
    }
    requestMainPosts();
    requestMainQuotes();
}

/**
 * 
 * Todo List를 Main에 넣는 함수
 */

function requestMainPosts() {
    const url = backEndServerAddress + "/todo/api/mainpost";

    var mainTodos = todoapi.requestMainPosts();

    mainTodos.then((data) => {

        if (data == null || data == "undefined") {
            mainPost.appendChild(nonDataInjector.createNonMainPost());
            return;
        }

        console.log(data);

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = post.createMainPost(content);
            console.log()

            // if (content.postImgCount > 0) {
            //     // request post img 
            //     var postImage = container.postImg;
            //     postImage.src = "";
            //     console.log(postImage);
            // }

            // if (content.userImgCount > 0) {
            //     // request user img
            //     var userImage = container.userImg;
            //     userImage.src = "";
            //     console.log(userImage);
            // }
            mainPost.appendChild(container);
        }
    });
}

/**
 * 
 * Quote List를 Main에 넣는 함수
 */

function requestMainQuotes() {
    const url = backEndServerAddress + "/quote/api/mainquote";

    var mainQuotes = quoteapi.requestMainQuotes({
        url : url
    });

    mainQuotes.then((data) => {

        if (data == null || data == "undefined") {
            postLists.appendChild(nonDataInjector.createQuoteList());
            return;
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = post.createQuoteList(content);

            
            postLists.appendChild(container);
        }
    });
}

/**
 * 유저의 정보를 가져옴
 */

function userDetailInfo() {

    var userIntroData = user.requestUserDetails({
        authorization: `${auth.getJsonToken()}`,
        url: backEndServerAddress + "/user/api/intro"
    });

    userIntroData.then((data) => {
        console.log(data);
        postUserIntroData(data);
    });

}

/**
 * 유저의 이미지를 컨테이너안에 넣어줌
 * 
 * @param {*} introData 
 */

function postUserIntroData(introData) {
    const username = document.querySelector("#username");
    const userComment = document.querySelector("#usercomment");
    const userImage = document.querySelector("#userImage");

    if (introData.introComment.length < 1) {
        userComment.innerText = "당신의 코멘트를 적어주세요.";
        
    } else {
        userComment.innerText = introData.introComment;
    }

    if(introData.userImageCount == 0) {
        userImage.setAttribute("hidden");
    } else {
        userImage.removeAttribute("hidden");
        // var userIntroImage = imageapi.requestUserImageByUserId();

        // userIntroImage.then((data)=>{
        //     userImage.src=`${data.filePath}/${data.fileName}`;

        // });
    }
    username.innerText = introData.username;
}