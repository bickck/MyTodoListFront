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
import {
    PostGenerator
} from "./../generator/post.js";

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
const postGenerator = new PostGenerator();


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
        authorization: auth.getJsonToken()
    })

    result.then((data) => {
        const id = data.id;
        const username = data.username;
        const comment = data.introComment;
        const fileName = data.fileName;
        const location = data.location;

        userIdContainer.innerText = id;
        usernameContainer.innerText = username;

        userIdContainer.setAttribute("value", id);
        usernameContainer.setAttribute("value", username);

        if (comment != null && comment.length != 0) {
            userCommentContainer.innerText = comment;
        } else {
            userCommentContainer.innerText = "당신의 코멘트를 적어주세요.";
        }

        if (fileName != null && location != null) {
            const imageSource = backEndServerAddress + `/${location}` + `/${fileName}`;
            userImageContainer.setAttribute("src", imageSource);
        } else {

        }


    });
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

    var result = userapi.requestUserTodos({
        authorization: auth.getJsonToken()
    });

    result.then((data) => {
        const todosSection = document.querySelector(".todo-section");
        clearChildNode(todosSection);

        if (data == null || data == "undefined" || data.content.length == 0) {
            todosSection.appendChild(nonDataInjector.createEmptyMainTodoPost());
            return;
        } else {


            const size = data.numberOfElements;

            for (var i = 0; i < size; i++) {
                const content = data.content[i];
                todosSection.appendChild(postGenerator.createMainPost(content));
            }
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
        console.log(data)
        const quoteSection = document.querySelector(".quote");
        clearChildNode(quoteSection);

        if (data == null || data == "undefined" || data.content.length == 0) {
            quoteSection.appendChild(nonDataInjector.createEmptyMainQuotePost());
            return;
        } else {

            const size = data.numberOfElements;

            for (var i = 0; i < size; i++) {
                const content = data.content[i];
                quoteSection.appendChild(postGenerator.createMainPost(content));
            }

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
        const todoLikeSection = document.querySelector(".todo-like-section");
        clearChildNode(todoLikeSection);

        console.log(data);


        if (data == null || data == "undefined" || data.content.length == 0) {
            todoLikeSection.appendChild(nonDataInjector.createEmptyMainTodoPost());
            return;
        } else {

            const size = data.numberOfElements;

            for (var i = 0; i < size; i++) {
                const content = data.content[i];
                todoLikeSection.appendChild(postGenerator.createMainPost(content));
            }
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
        clearChildNode(quoteSection);

        if (data == null || data == "undefined" || data.content.length == 0) {
            clearChildNode(quoteSection);
            quoteSection.appendChild(nonDataInjector.createEmptyMainQuotePost());
            return;
        } else {

            const size = data.numberOfElements;

            for (var i = 0; i < size; i++) {
                const content = data.content[i];
                quoteSection.appendChild(postGenerator.createMainPost(content));
            }
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
