import {
    UserApi
} from "./../api/userapi.js";
import {
    ImageApi
} from "./../api/imageapi.js";

import {
    Auth
} from "./../account/auth.js";

import {
    NonDataInjector
} from "./../util/page.js"
import {
    Users
} from "../server/users.js";

const userInfoButton = document.querySelector("#user-info-button");
const userTodoButton = document.querySelector("#user-todo-button");
const userQuoteButton = document.querySelector("#user-quote-button");
const userTodoLikeButton = document.querySelector("#user-todo-like-button");
const userQuoteLikeButton = document.querySelector("#user-quote-like-button");

var userInfoPost = document.querySelector("#user-info");
var todoPost = document.querySelector("#todo");
var quotePost = document.querySelector("#quote");
var todoLikePost = document.querySelector("#todo-like");
var quoteLikePost = document.querySelector("#quote-like");

var prevPage = todoPost;
var currPage = todoPost;

const user = new Users();
const auth = new Auth();
const userapi = new UserApi();
const imageapi = new ImageApi();
const nonDataInjector = new NonDataInjector();


window.onload = function init() {
    setUserTodoPost();
    setSidebarUserIntro();
}


function postHiddenActions(event) {

    var currEventButton = event.target;
    var eventId = currEventButton.id;

    prevPage = currPage;

    if (eventId == "user-info-button") {
        var post = userInfoPost;
        currPage = post;
        setUserInfoPost();
    }
    if (eventId == "user-todo-button") {
        var post = todoPost;
        currPage = post;
        setUserTodoPost();
    }
    if (eventId == "user-quote-button") {
        var post = quotePost;
        currPage = post;
        setUserQuotePost();
    }
    if (eventId == "user-todo-like-button") {
        var post = todoLikePost;
        currPage = post;
        setUserTodoLikePost();
    }
    if (eventId == "user-quote-like-button") {
        var post = quoteLikePost;
        currPage = post;
        setUserQuoteLikePost();
    }

    if (currPage == prevPage) {
        return;
    }

    prevPage.setAttribute("hidden", "");
    currPage.removeAttribute("hidden");
}

function setSidebarUserIntro() {
    const userIdContainer = document.querySelector("#userId")
    const usernameContainer = document.querySelector("#username");
    const userCommentContainer = document.querySelector("#usercomment");
    const userImageContainer = document.querySelector("#userImage");

    var result = user.requestUserDetails({
        authorization : auth.getJsonToken()
    })

    result.then((data)=> {
        const id = data.id;
        const username = data.username;
        const comment = data.introComment;
        const fileName = data.fileName;
        const location = data.location;
        
        userIdContainer.innerText = id;
        usernameContainer.innerText = username;

        userIdContainer.setAttribute("value",id);
        usernameContainer.setAttribute("value",username);
        
        if(comment != null && comment.length != 0) {
            userCommentContainer.innerText = comment;
        } else {
            userCommentContainer.innerText = "당신의 코멘트를 적어주세요.";
        }
        
        if(fileName != null && location != null) {
            const imageSource = backEndServerAddress + `/${location}` + `/${fileName}`;
            userImageContainer.setAttribute("src",imageSource);
        } else {

        }


    });

    // if (introData.introComment.length < 1) {
    //     userComment.innerText = "당신의 코멘트를 적어주세요.";
        
    // } else {
    //     userComment.innerText = introData.introComment;
    // }

    // if(introData.userImageCount == 0) {
    //     userImage.setAttribute("hidden");
    // } else {
    //     userImage.removeAttribute("hidden");
    // }
    // username.innerText = introData.username;
}

/**
 * 
 */

function setUserInfoPost() {

}

/**
 * 
 */

function setUserTodoPost() {

    var result = userapi.requestUserLikeTodo({
        authorization: auth.getJsonToken()
    });

    result.then((data) => {
        const todosSection = document.querySelector(".todo-section");

        if (data == null || data == "undefined" || data.content.length == 0) {
            clearChildNode(todosSection);
            todosSection.appendChild(nonDataInjector.createEmptyMainTodoPost());
            return;
        }

    });
}

/**
 * 
 */

function setUserQuotePost() {

    var result = userapi.requestUserQuotes({
        authorization: auth.getJsonToken()
    });

    result.then((data) => {
        const quoteSection = document.querySelector(".quote");
        if (data == null || data == "undefined" || data.content.length == 0) {
            clearChildNode(quoteSection);
            quoteSection.appendChild(nonDataInjector.createEmptyMainQuotePost());
            return;
        }

    });
}

/**
 * 
 */

function setUserTodoLikePost() {

    var result = userapi.requestUserLikeTodo({
        authorization: auth.getJsonToken()
    });

    result.then((data) => {
        const quoteSection = document.querySelector(".todo-like-section");
        if (data == null || data == "undefined" || data.content.length == 0) {
            clearChildNode(quoteSection);

            quoteSection.appendChild(nonDataInjector.createEmptyMainTodoPost());
            console.log("empty data");

            return;
        }
    });

}

/**
 * 
 */

function setUserQuoteLikePost() {

    var result = userapi.requestUserLikeQuote({
        authorization: auth.getJsonToken()
    });

    result.then((data) => {
        const quoteSection = document.querySelector(".quote-like-section");
        if (data == null || data == "undefined" || data.content.length == 0) {
            clearChildNode(quoteSection);
            quoteSection.appendChild(nonDataInjector.createEmptyMainQuotePost());
            console.log("empty data");
            return;
        }
    });
}

function clearChildNode(section) {
    section.innerHTML = "";
}

userInfoButton.addEventListener("click", postHiddenActions);
userTodoButton.addEventListener("click", postHiddenActions);
userQuoteButton.addEventListener("click", postHiddenActions);
userTodoLikeButton.addEventListener("click", postHiddenActions);
userQuoteLikeButton.addEventListener("click", postHiddenActions);
