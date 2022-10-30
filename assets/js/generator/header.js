/**
 * 
 */

// import { Auth } from "../account/Auth.js";
// const auth = new Auth();

// import {
//     Auth
// } from "../account/auth.js";
// const auth = new Auth();


const mainLink = document.querySelector("header #mainLink");
var lists = $(".page").navList();
var loginPageContainer = $(".loginPage")[0].children[0];
var loginPageLink = loginPageContainer.href;

var requestPage = {
    todoPage: frontEndServerAddress + "/assets/html/todo.html",
    quotePage: frontEndServerAddress + "/assets/html/quote.html",
    imagePage: frontEndServerAddress + "/assets/html/image.html",
    communityPage: frontEndServerAddress + "/assets/html/community.html",
    length: 4
};

function init() {
    headerLinkInjector();
    writeLink();
}

function headerLinkInjector() {
    lists[0] = '<li>' + lists[0].replace("#", requestPage.todoPage) + '</li>';
    lists[1] = '<li>' + lists[1].replace("#", requestPage.quotePage) + '</li>';
    lists[2] = '<li>' + lists[2].replace("#", requestPage.imagePage) + '</li>';
    lists[3] = '<li>' + lists[3].replace("#", requestPage.communityPage) + '</li>';

    $(".lists li").remove();
    $(".lists").append(lists);

    loginPageContainer.href = frontEndServerAddress + loginPageURL;
    mainLink.href = frontEndServerAddress;
}

function writeLink() {
    var todoLink = document.querySelector(".write-todo");
    var quoteLink = document.querySelector(".write-quote");

    if (todoLink != null && quoteLink != "undefined") {
        todoLink.href = frontEndServerAddress + "/assets/html/writetodo.html";
    }

    if (quoteLink != null && quoteLink != "undefined") {
        quoteLink.href = frontEndServerAddress + "/assets/html/writequote.html";
    }

}

init();