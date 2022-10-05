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

var requestPage = {
    todoPage: frontEndServerAddress + "/assets/html/todo.html",
    quotePage: frontEndServerAddress + "/assets/html/quote.html",
    imagePage: frontEndServerAddress + "",
    communityPage: frontEndServerAddress + "",
    length : 4
};

var lists = $(".page").navList();
var loginPageContainer = $(".loginPage")[0].children[0];
var loginPageLink = loginPageContainer.href;

function header() {
    lists[0] = '<li>' + lists[0].replace("#", requestPage.todoPage) + '</li>';
    lists[1] = '<li>' + lists[1].replace("#", requestPage.quotePage) + '</li>';
    lists[2] = '<li>' + lists[2].replace("#", requestPage.imagePage) + '</li>';
    lists[3] = '<li>' + lists[3].replace("#", requestPage.communityPage) + '</li>';

    $(".lists li").remove();
    $(".lists").append(lists);

    console.log(loginPageLink);
    loginPageLink = loginPageLink.replace("/index.html#", "/assets/html/login.html");
    loginPageContainer.href = loginPageLink;
    
    
}

header();