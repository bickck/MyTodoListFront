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
const editComment = document.querySelector(".edit-usercomment");
const recommandSyncButton = document.querySelector(".recommand-sync");
const dailySyncButton = document.querySelector(".daily-sync");
const userCommentSaveButton = document.querySelector("#user-comment-save-button");

window.onload = function init(event) {
    event.preventDefault();

    if (auth.getJsonToken() != null) {
        userDetailInfo();
    }
    requestMainPosts();
    requestMainQuotes();

    editComment.addEventListener("click", createUserCommentInput);

    recommandSyncButton.addEventListener("click", refreshRandomRecommandTodo);
    dailySyncButton.addEventListener("click", refreshRandomDailyQuote);
    userCommentSaveButton.addEventListener("click", requestSaveComment);
}


/**
 * 
 * Todo List를 Main에 넣는 함수
 */

function requestMainPosts() {
    const url = backEndServerAddress + "/todo/api/mainpost";

    var mainTodos = todoapi.requestMainPosts();

    mainTodos.then((data) => {

        console.log(data);
        if (data == null || data == "undefined" || data.content.length == 0) {
            mainPost.appendChild(nonDataInjector.createNonMainPost());
            return;
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = post.createMainPost(content);

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
        url: url
    });

    mainQuotes.then((data) => {

        if (data == null || data == "undefined" || data.content.length == 0) {
            postLists.appendChild(nonDataInjector.createEmptyMainQuotePost());
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

    console.log(introData);

    if (introData.introComment == null || introData.introComment == "") {
        userComment.innerText = "당신의 코멘트를 적어주세요.";

    } else {
        userComment.innerText = introData.introComment;
    }

    const imageSource = backEndServerAddress + `/image/api/user/source/${introData.fileName}/${introData.originalFileName}`;

    userImage.src = imageSource;
    username.innerText = introData.username;
}

/**
 * 친구 추천 (예정)
 */

function requestMiniQuotes() {


}

/**
 * 
 */
function createUserCommentInput() {

    var input = document.querySelector(".comment-input");

    if (input.attributes.hidden == null || input.attributes.hidden == "undefined") {
        input.setAttribute("hidden", "");
    } else {
        input.removeAttribute("hidden");
    }


}

/**
 * 
 * @param {*} event 
 */

function requestSaveComment(event) {
    event.preventDefault();

    const commentInput = document.querySelector("#introComment").value;

    var userCommentArea = document.querySelector("#usercomment");

    user.requestSaveUserIntro({
        introComment: commentInput
    });

    createUserCommentInput();
    document.querySelector("#introComment").value = "";
    userCommentArea.innerText = commentInput;
}

/**
 * 
 */

function refreshRandomDailyQuote() {
    const postQuote = document.querySelector(".quote");
    console.log("refreshRandomDailyQuote");

}

/**
 * 
 */

function refreshRandomRecommandTodo() {
    const miniPost = document.querySelector(".mini-posts")
}

var $body = $('body');
var $alarm = $("#alarm");
var $nav = $("nav.main");

$alarm
    .appendTo($nav)
    .panel({
        delay: 500,
        hideOnClick: true,
        hideOnSwipe: true,
        resetScroll: true,
        resetForms: true,
        side: 'left',
        target: $body,
        visibleClass: 'is-alarm-visible'
    });