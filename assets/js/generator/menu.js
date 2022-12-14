import {
    Users
} from "./../server/users.js";
import {
    Auth
} from "./../account/auth.js";

const auth = new Auth();
const user = new Users();
const authLinks = document.querySelector("#menu > .auth .links");
const nonAuthLinks = document.querySelector("#menu > .non-auth .links");
const logout = document.querySelector("#logout");

function authlinkInjector() {

    for (var i = 0; i < authLinks.childElementCount; i++) {
        var link = authLinks.children[i].lastElementChild.href;
        if (link.includes("#userManagePage")) {
            link = frontEndServerAddress + "/assets/html/userpage.html";
        }
        if (link.includes("#userTodoPage")) {
            link = frontEndServerAddress + "/assets/html/usertodo.html";
        }
        if (link.includes("#userQuotePage")) {
            link = frontEndServerAddress + "/assets/html/userquote.html";
        }
        if (link.includes("#userTodoWritePage")) {
            link = frontEndServerAddress + "/assets/html/writetodo.html";
        }
        if (link.includes("#userQuoteWritePage")) {
            link = frontEndServerAddress + "/assets/html/writequote.html";
        }
        authLinks.children[i].lastElementChild.href = link;
    }
}

function nonAuthLinkInjector() {
    for (var i = 0; i < nonAuthLinks.childElementCount; i++) {
        var link = nonAuthLinks.children[i].lastElementChild.href;
        if (link.includes("#pagetodo")) {
            link = frontEndServerAddress + "/assets/html/todo.html";
        }
        if (link.includes("#pagequote")) {
            link = frontEndServerAddress + "/assets/html/quote.html";
        }
        nonAuthLinks.children[i].lastElementChild.href = link;
    }
}

function logoutEvent(event) {
    event.preventDefault();

    if (auth.getJsonToken() == null) {
        return;
    }

    auth.removeToken();
    var result = fetch(backEndServerAddress + "/auth/logout", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    }).catch((error) => {
        console.log(error);
    });
    window.location.href = mainPageAddress;
}

logout.addEventListener("click", logoutEvent);

authlinkInjector();
nonAuthLinkInjector();