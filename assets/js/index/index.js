/**
 * 
 */

import {setUserProfileImageUrl,setUserProfileCommentStr,refreshCommentInputElement} from "./../generator/functions.js";
import {PostGenerator} from "./../generator/post.js";
import {Auth} from "./../account/auth.js";
import {Users} from "./../server/users.js";
import {TodoApi} from "./../api/todoapi.js";
import {QuoteApi} from "./../api/quoteapi.js";
import {ImageApi} from "./../api/imageapi.js";
import {NonDataInjector} from "./../util/page.js"
import "./../config.js";
import "./../generator/menu.js";
import "./../generator/header.js";
import "./../generator/footer.js";


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

    var mainTodos = todoapi.requestMainPosts();

    mainTodos.then((data) => {

        if (data == null || data == "undefined" || data.empty == true) {
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

    var mainQuotes = quoteapi.requestMainQuotes();

    mainQuotes.then((data) => {

        if (data == null || data == "undefined" || data.empty == true) {
            postLists.appendChild(nonDataInjector.createEmptyQuoteList());
            return;
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = post.createQuoteList(content);
            postLists.appendChild(container);
        }
    });
}

/** */

/**
 * 유저의 정보를 가져옴
 */

function userDetailInfo() {

    var userIntroData = user.requestUserDetails();

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

    const usernameContainer = document.querySelector("#username");
    const userCommentContainer = document.querySelector("#usercomment");
    const userImageContainer = document.querySelector("#userImage");

    const comment = introData.introComment;
    const username = introData.username;

    const filePath = introData.fileName;
    const originalFileName = introData.originalFileName;

    userCommentContainer.innerText = setUserProfileCommentStr(comment)
    userImageContainer.src = setUserProfileImageUrl(filePath, originalFileName);;
    usernameContainer.innerText = username;
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

    var result = user.requestSaveUserIntro({
        introComment: commentInput
    });

    result.then((data) => {
        createUserCommentInput();
        document.querySelector("#introComment").value = "";
        userCommentArea.innerText = commentInput;
    });
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