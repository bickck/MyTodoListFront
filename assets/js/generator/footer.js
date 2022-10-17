import { Auth } from "../account/Auth.js";
const auth = new Auth();


function authDisabledCheck() {
    var token = auth.getJsonToken();
    var nonAuthClazz = document.getElementsByClassName("non-auth");
    var authClazz = document.getElementsByClassName("auth");

    if (token == null || token == "undefined") {
        for (var i = 0; i < nonAuthClazz.length; i++) {
            nonAuthClazz[i].style.display = "block";
        }
        for (var i = 0; i < authClazz.length; i++) {
            authClazz[i].style.display = "none";
        }
    } else {
        for (var i = 0; i < nonAuthClazz.length; i++) {
            nonAuthClazz[i].style.display = "none";
        }
        for (var i = 0; i < authClazz.length; i++) {
            authClazz[i].style.display = "block";
        }
    }
}

authDisabledCheck();