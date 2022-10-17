//const headerTagId = document.querySelector("#header");
// const links = document.querySelectorAll(".link");
// function header() {
//     var mainLogoTag = document.createElement("h1");
//     var logoLink = document.createElement("a");
//     var linksNav = document.createElement("nav");
//     var linksUl = document.createElement("ul");
//     var linksLi = document.createElement("li");
//     var aLink = document.createElement("a");
//     var mainNav = document.createElement("nav");
//     var mainUl = document.createElement("ul");
//     var childLiSearch = document.createElement("li");
//     var searchForm = document.createElement("form");
//     var childLiMenu = document.createElement("li");
//      logoLink.setAttribute("href","index.html");
//      mainLogoTag.appendChild(logoLink);
//      linksNav.setAttribute("class","links");
//      //-- li --
//      //-- li --
//      linksNav.appendChild(linksUl);
//      mainNav.setAttribute("class","main");
//      mainUl.appendChild(childLiSearch);
//      mainUl.appendChild(childLiMenu);
// }
//const links = headerTagId.children[1];
// console.log(navList());

// import { Auth } from "../account/Auth.js";

// const auth = new Auth();
var lists = $(".page").navList();
var loginPageContainer = $(".loginPage")[0].children[0];
var loginPageLink = loginPageContainer.href;

var requestPage = {
    todoPage: frontEndServerAddress + "/assets/html/todo.html",
    quotePage: frontEndServerAddress + "/assets/html/quote.html",
    imagePage: frontEndServerAddress + "",
    communityPage: frontEndServerAddress + "",
    length: 4
};

// var requestPage = {
//     todoPage: frontEndServerAddress + "./assets/html/todo.html",
//     quotePage: frontEndServerAddress + "assets/html/quote.html",
//     imagePage: frontEndServerAddress + "",
//     communityPage: frontEndServerAddress + "",
//     length: 4
// };

var requestAuthLinkMenu = {
    userTodoPage: backEndServerAddress + "/todo/api/",
    userQuotePage: backEndServerAddress + "/quote/api/",
    userManagePage: backEndServerAddress + "/user/api/info",
}

var requestNonAuthLinkMenu = {
    todoPage: backEndServerAddress + "/page/quote",
    quotePage: backEndServerAddress + "/page/todo",
    // userManagePage: backEndServerAddress + "",
}

function init() {

    header();
    linksAuthMenu();
    linksNonAuthMenu();
    // authDisabledCheck();
}

function header() {
    lists[0] = '<li>' + lists[0].replace("#", requestPage.todoPage) + '</li>';
    lists[1] = '<li>' + lists[1].replace("#", requestPage.quotePage) + '</li>';
    lists[2] = '<li>' + lists[2].replace("#", requestPage.imagePage) + '</li>';
    lists[3] = '<li>' + lists[3].replace("#", requestPage.communityPage) + '</li>';

    $(".lists li").remove();
    $(".lists").append(lists);

    
    //loginPageLink = loginPageLink.replace("/index.html#", "/assets/html/login.html");
    loginPageContainer.href = frontEndServerAddress + "/assets/html/login.html";
}

function linksAuthMenu() {
    var authSection = document.querySelectorAll(".auth .links")[0];
    var userAPIInfoLink = authSection.children[0].children[0];
    var todoAPILink = authSection.children[1].children[0];
    var quoteAPILink = authSection.children[2].children[0];
   
    userAPIInfoLink.href = requestAuthLinkMenu.userManagePage;
    todoAPILink.href = requestAuthLinkMenu.userTodoPage;
    quoteAPILink.href = requestAuthLinkMenu.userQuotePage;
}

function linksNonAuthMenu() {
    var nonAuthSection = document.querySelectorAll(".non-auth .links")[0];
    var todoPageLink = nonAuthSection.children[0].children[0];
    var quotePageLink = nonAuthSection.children[1].children[0];

    todoPageLink.href = requestNonAuthLinkMenu.todoPage;
    quotePageLink.href = requestNonAuthLinkMenu.quotePage;
    
}

// function authDisabledCheck() {
//     var token = auth.getJsonToken();
//     var nonAuthClazz = document.getElementsByClassName("non-auth");
//     var authClazz = document.getElementsByClassName("auth");

//     if (token == null || token == "undefined") {
//         for (var i = 0; i < nonAuthClazz.length; i++) {
//             nonAuthClazz[i].style.display = "block";
//         }
//         for (var i = 0; i < authClazz.length; i++) {
//             authClazz[i].style.display = "none";
//         }
//     } else {
//         for (var i = 0; i < nonAuthClazz.length; i++) {
//             nonAuthClazz[i].style.display = "none";
//         }
//         for (var i = 0; i < authClazz.length; i++) {
//             authClazz[i].style.display = "block";
//         }
//     }
// }

init();