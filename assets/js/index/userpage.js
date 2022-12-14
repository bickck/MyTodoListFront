import {
    setUserProfileImageUrl,
    setUserProfileCommentStr,
    refreshCommentInputElement
} from "./../generator/functions.js";
import "./../generator/header.js";
import "./../generator/footer.js";
import "./../generator/menu.js";
import {
    UserApi
} from "./../api/userapi.js";
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
import {
    Todo
} from "./../server/todo.js";
import {
    Quote
} from "./../server/quote.js";
import {
    TodoApi
} from "../api/todoapi.js";
import {
    QuoteApi
} from "../api/quoteapi.js";

const userimageUpdateButton = document.querySelector("#user-image-update");
const userimageDeleteButton = document.querySelector("#user-image-delete");
const userDeleteButton = document.querySelector("#user-delete");
const userUpdateButton = document.querySelector("#user-update");
const userIntroSaveButton = document.querySelector("#user-intro-save");
const changeTextViewButton = document.querySelector("#user-update-cancle");
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
const todo = new Todo();
const quote = new Quote();
const userapi = new UserApi();
const todoapi = new TodoApi();
const quoteapi = new QuoteApi();
const nonDataInjector = new NonDataInjector();
const postGenerator = new PostGenerator();

var query = window.location.search;
var username;
var permission = "FAILURE";

window.onload = function init() {
    username = getQueryUserName(query);

    if (username != null && auth.getJsonToken() != null) {
        var result = auth.isCheckUserPermissionCheck(username);
        result.then((data) => {
            permission = data;
        });
    }
    setUserTodoPost();
    setSidebarUserIntro();
}

function getQueryUserName(query) {
    const username = new URLSearchParams(query).get("username");
    return username;
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

    var result;

    if(username != null) {
        result = userapi.requestUserDetails(username);
    } else {
        result = user.requestUserDetails();
    }

    result.then((data) => {

        const id = data.id;
        const username = data.username;
        const comment = data.introComment;
        const physicalPath = data.fileName;
        const originalFileName = data.originalFileName;

        userIdContainer.innerText = id;
        usernameContainer.innerText = username;
        userCommentContainer.innerText = setUserProfileCommentStr(comment);
        userImageContainer.src = setUserProfileImageUrl(physicalPath, originalFileName);

        userIdContainer.setAttribute("value", id);
        usernameContainer.setAttribute("value", username);
    });
}

/**
 * 
 */

function setUserInfoPost() {

    var result = user.requestUserDetails();

    result.then((data) => {

        const comment = data.introComment;
        const username = data.username;
        const physicalPath = data.fileName;
        const originalFileName = data.originalFileName;

        const introEmailSection = document.querySelector("#intro-email");
        const introUsernameSection = document.querySelector("#intro-username");
        const introCommentSection = document.querySelector("#intro-comment");
        const introBirthSection = document.querySelector("#intro-birth");
        const introUserImage = document.querySelector(".user-image");

        introCommentSection.innerText = setUserProfileCommentStr(comment);
        introUsernameSection.innerText = username;
        introBirthSection.innerText = "";
        introUserImage.src = setUserProfileImageUrl(physicalPath, originalFileName);
    });
}

/**
 * 
 */

function setUserTodoPost() {

    var result;

    if (username != null) {
        result = todoapi.requestUserTodosByUserName(username);
    } else {
        result = userapi.requestUserTodos();
    }

    result.then((data) => {
        const todosSection = document.querySelector(".todo-section");
        clearChildNode(todosSection);

        if (data == null || data == "undefined" || data.content.length == 0) {
            todosSection.appendChild(nonDataInjector.createEmptyMainTodoPost());
            return;
        }

        const size = data.numberOfElements;

        for (var i = 0; i < size; i++) {
            const content = data.content[i];
            const container = postGenerator.createMainPost(content);
            const addedAction = createPostManageActions(container, data.content[i].id, "TODO");
            todosSection.appendChild(addedAction);
        }
    });
}

/**
 * 
 */

function setUserQuotePost() {

    var result;

    if (username != null) {
        result = quoteapi.requestUserQuoteByUserName(username);
    } else {
        result = userapi.requestUserQuotes();
    }

    result.then((data) => {
        const quoteSection = document.querySelector(".quote-section");
        clearChildNode(quoteSection);

        if (data == null || data == "undefined" || data.content.length == 0) {
            quoteSection.appendChild(nonDataInjector.createEmptyMainQuotePost());
            return;
        }

        const size = data.numberOfElements;

        for (var i = 0; i < size; i++) {
            const content = data.content[i];
            const container = postGenerator.createMainQuote(content);
            const addedAction = createPostManageActions(container, data.content[i].id, "QUOTE");
            quoteSection.appendChild(addedAction);
        }
    });
}

/**
 * 
 */
function setUserTodoLikePost() {

    var result;

    if (username != null) {
        result = todoapi.requestUserLikeTodoByUserName(username);
    } else {
        result = userapi.requestUserLikeTodo();
    }

    result.then((data) => {
        const todoLikeSection = document.querySelector(".todo-like-section");
        clearChildNode(todoLikeSection);

        if (data == null || data == "undefined" || data.content.length == 0) {
            todoLikeSection.appendChild(nonDataInjector.createEmptyMainTodoPost());
            return;
        }
        const size = data.numberOfElements;

        for (var i = 0; i < size; i++) {
            const content = data.content[i];
            const container = postGenerator.createMainPost(content);
            todoLikeSection.appendChild(container);
        }

    });
}

/**
 * 
 */
function setUserQuoteLikePost() {

    var result;

    if (username != null) {
        result = quoteapi.requestUserLikeQuoteByUserName(username);
    } else {
        result = userapi.requestUserLikeQuote();
    }

    result.then((data) => {

        const quoteSection = document.querySelector(".quote-like-section");
        clearChildNode(quoteSection);

        if (data == null || data == "undefined" || data.content.length == 0) {
            quoteSection.appendChild(nonDataInjector.createEmptyMainQuotePost());
            return;
        }
        const size = data.numberOfElements;

        for (var i = 0; i < size; i++) {
            const content = data.content[i];
            const container = postGenerator.createMainPost(content);
            quoteSection.appendChild(container);
        }

    });
}

/**
 * 
 * @param {*} arg 
 */

function createPostManageActions(arg, postid, postKind) {

    if (permission == "FAILURE") {
        return arg;
    }

    const postActionsContainer = arg.lastChild.firstChild;

    const deleteList = document.createElement("li");
    const updateList = document.createElement("li");

    const deleteButton = document.createElement("a");
    const updateButton = document.createElement("a");

    deleteButton.innerText = "DELETE";
    updateButton.innerText = "UPDATE";

    deleteList.setAttribute("class", "post_delete");
    updateList.setAttribute("class", "post_update");

    deleteButton.setAttribute("class", "delete");
    updateButton.setAttribute("class", "update");



    deleteButton.addEventListener("click", function setDeleteActions() {

        if (postKind == "TODO" || postKind == "todo") {

            popupOpen("?????????????????????????", function () {

                var server = todo.requestUserTodoDelete({
                    id: postid
                });

                server.then((data) => {
                    if (data == "SUCCESS") {
                        popupClose();
                        setUserTodoPost();
                    }
                });
            });
        }
        if (postKind == "QUOTE" || postKind == "quote") {

            popupOpen("?????????????????????????", function () {

                var server = quote.requestUserQuoteDelete({
                    id: postid
                });

                server.then((data) => {
                    if (data == "SUCCESS") {
                        popupClose();
                        setUserQuotePost();
                    }
                });
            });
        }
    });

    if (postKind == "TODO" || postKind == "todo") {
        updateButton.setAttribute("href", frontEndServerAddress + `/assets/html/updatetodo.html?todoid=${postid}`);
    }

    if (postKind == "QUOTE" || postKind == "quote") {
        updateButton.setAttribute("href", frontEndServerAddress + `/assets/html/updatequote.html?quoteid=${postid}`);
    }

    deleteList.appendChild(deleteButton);
    updateList.appendChild(updateButton);

    postActionsContainer.appendChild(deleteList);
    postActionsContainer.appendChild(updateList);

    return arg;
}

/**
 * 
 * @param {*} event 
 */

function userImageUpdateAction(event) {

    const imageContainer = document.querySelector(".user-image");
    var files = event.target.files;


    var result = user.requestUpdateUserIntroImage({
        file: files
    });

    result.then((data) => {

        if (data == "SUCCESS") {
            imagePreviewer(event.target, imageContainer);
        }
    });
}

/**
 * 
 * @param {*} input 
 * @param {*} imgTag 
 * @returns 
 */

function imagePreviewer(input, imgTag) {

    if (input == null && label == null) {
        return;
    }

    if (input.file || input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            imgTag.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

/**
 * 
 * @param {*} event 
 */

function userImageDeleteAction(event) {

    var result = user.requestDeleteUserIntroImage();

    result.then((data) => {
        const imageContainer = document.querySelector(".user-image");
        imageContainer.src = userDefaultImageLocation;
    });
}

/**
 * 
 */

function userUpdateAction(event) {

    const save = document.querySelector(".intro-update-view");
    const cancle = document.querySelector(".intro-update-cancle");

    const delteUserButton = document.querySelector(".intro-delete-button");
    const introSaveButton = document.querySelector(".intro-save-button");

    const birthContainer = document.querySelector(".birth-input-container");
    const usernameContainer = document.querySelector(".username-input-container");
    const commentContainer = document.querySelector(".comment-input-container");

    const viewBirthContainer = document.querySelector(".view-username");
    const viewCommentContainer = document.querySelector(".view-comment");
    const viewUsername = document.querySelector(".view-birth");

    if (cancle.hasAttribute("hidden")) {
        save.setAttribute("hidden", "");
        cancle.removeAttribute("hidden");
    }

    if (birthContainer.hasAttribute("hidden")) {
        viewBirthContainer.setAttribute("hidden", "");
        birthContainer.removeAttribute('hidden');
    } else {
        birthContainer.setAttribute('hidden', "");
        viewBirthContainer.removeAttribute("hidden");
    }

    if (usernameContainer.hasAttribute("hidden")) {
        viewUsername.setAttribute("hidden", "");
        usernameContainer.removeAttribute('hidden');
    } else {
        usernameContainer.setAttribute('hidden', "");
        viewUsername.removeAttribute("hidden");
    }

    if (commentContainer.hasAttribute("hidden")) {
        viewCommentContainer.setAttribute("hidden", "");
        commentContainer.removeAttribute('hidden');
    } else {
        commentContainer.setAttribute('hidden', "");
        viewCommentContainer.removeAttribute("hidden");
    }

    if (introSaveButton.hasAttribute("hidden")) {
        introSaveButton.removeAttribute("hidden");
    } else {
        introSaveButton.setAttribute("hidden", "");
    }

    if (delteUserButton.hasAttribute("hidden")) {
        delteUserButton.removeAttribute("hidden");
    } else {
        delteUserButton.setAttribute("hidden", "");
    }
}

/**
 * 
 */

function cancleUpdateBtn() {

    const save = document.querySelector(".intro-update-view");
    const cancle = document.querySelector(".intro-update-cancle");

    if (save.hasAttribute("hidden")) {
        save.removeAttribute("hidden");
        cancle.setAttribute("hidden", "");
        userUpdateAction();
    }
}

/**
 * 
 */

function userDeleteAction() {
    console.log("userDeleteAction");
}

/**
 * 
 */

function userIntroSave() {

    const username = document.querySelector("#update-intro-username");
    const comment = document.querySelector("#update-intro-comment");
    const birth = document.querySelector("#update-intro-birth");

    var result = user.requestUserUpdate({
        username: username.value,
        comment: comment.value,
        birth: birth.value
    });

    result.then((data) => {
        if (data == "SUCCESS") {
            setUserInfoPost();
            userUpdateAction();
        }

    });
}

/**
 * 
 * @param {*} section 
 */

function clearChildNode(section) {
    section.innerHTML = "";
}

function checkingUserTokenUser() {

}

changeTextViewButton.addEventListener("click", cancleUpdateBtn);
userInfoButton.addEventListener("click", postHiddenActions);
userTodoButton.addEventListener("click", postHiddenActions);
userQuoteButton.addEventListener("click", postHiddenActions);
userTodoLikeButton.addEventListener("click", postHiddenActions);
userQuoteLikeButton.addEventListener("click", postHiddenActions);

userimageUpdateButton.addEventListener("change", userImageUpdateAction);
userimageDeleteButton.addEventListener("click", userImageDeleteAction);
userDeleteButton.addEventListener("click", userDeleteAction);
userUpdateButton.addEventListener("click", userUpdateAction);
userIntroSaveButton.addEventListener("click", userIntroSave);
