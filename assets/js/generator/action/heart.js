import {
    Todo
} from "../../server/todo.js";
import {
    Quote
} from "../../server/quote.js";

import {
    Auth
} from "../../account/auth.js"

const todo = new Todo();
const quote = new Quote();
const auth = new Auth();


/**
 * 
 * @param {*} heartuuid 
 * @param {*} postId 
 * @param {*} heart 
 * @param {*} heartContainer 
 * @returns 
 */

function cancleHeart(heartUUID, postId, heart, heartContainer) {

    if (heart == 0) {
        heartContainer.innerText = heart;

        return;
    }

    var decreaseHeart = Number(heart) - 1;
    heartContainer.innerText = decreaseHeart;
    heartContainerValueInjector(postId, false, heartUUID, decreaseHeart, heartContainer);
}

function addHeart(heartUUID, postId, heart, heartContainer) {

    var increaseHeart = Number(heart) + 1;
    heartContainer.innerText = increaseHeart;
    heartContainerValueInjector(postId, true, heartUUID, increaseHeart, heartContainer);
}

/**
 * 
 * @param {*} arg 
 */

function injectorTodoAuthValue(postId, heart, heartContainer) {

    var result = todo.requestHeartExists({
        id: postId
    });

    result.then((exists) => {

        var uuid = exists.uuid;
        var isExists = exists.exists;

        if (isExists == true) {
            var result = todo.requestCancleHeart({
                id: uuid
            });
            result.then((data) => {
                cancleHeart(null, postId, heart, heartContainer);
            });
        } else {
            var result = todo.requestSaveHeart({
                id: postId
            })
            result.then((data) => {
                console.log("add");
                addHeart(data, postId, heart, heartContainer);
            });
        }
    });
}

/**
 * 
 * @param {*} arg 
 */

function injectorQuoteAuthValue(postId, heart, heartContainer) {

    var result = quote.requestHeartExists({
        id: postId
    });

    result.then((exists) => {

        var uuid = exists.uuid;
        var isExists = exists.exists;

        if (isExists == true) {
            var result = quote.requestCancleHeart({
                id: uuid
            });
            result.then((data) => {
                cancleHeart(null, postId, heart, heartContainer);
            });
        } else {
            var result = quote.requestSaveHeart({
                id: postId
            })
            result.then((data) => {
                addHeart(data, postId, heart, heartContainer);
            });
        }
    });
}

// function setChangeHeartEvent(id, heartContainer) {
//     heartContainerValueInjector(id, `false`, null, 0, heartContainer);
//     heartContainer.addEventListener("click", function () {
//         injectorTodoAuthValue(id, heartContainer);
//     });
// }
/**
 * 
 * @param {*} arg 
 */

function todoPrivateAction(arg, heartContainer) {

    var todoId = arg.postId;
    heartContainer.innerText = "private";

    // heartContainer.addEventListener("click", function () {
    //     heartContainer.innerText = 0;

    //     todo.requestChangePublish({
    //         id: todoId
    //     });
    //     injectorTodoAuthValue(todoId, heartContainer);
    // });
}


/**
 * 
 * @param {*} arg 
 */

function quotePrivateAction(arg, heartContainer) {

    var quoteId = arg.postId;
    heartContainer.innerText = "private";

    // heartContainer.addEventListener("click", function () {
    //     heartContainer.innerText = 0;
    //     quote.requestChangePublish({
    //         id: quoteId
    //     });
    //     setChangeHeartEvent(quoteId, heartContainer);
    // });
}

function heartContainerValueInjector(id, isExists, uuid, heart, container) {
    container.setAttribute("id", `heart-${id}`);
    container.setAttribute("isExists", `${isExists}`);
    container.setAttribute("uuid", `${uuid}`);
    container.setAttribute("value", heart);
}

function noticeLoginRequest() {
    console.log("Need login");
}


function setEventTodoHeart(arg, heartContainer) {

    var todoId = arg.id;
    var heart = arg.heart;
    const isTodoPublished = arg.isPublish;
    heartContainer.innerText = heart;

    if (auth.getJsonToken() == null) {
        noticeLoginRequest(arg);
        return;
    }
    if (isTodoPublished == "PUBLISH" || isTodoPublished == "publish") {
        heartContainer.addEventListener("click", function () {
            injectorTodoAuthValue(todoId, heart, heartContainer);
        });
        return;
    }
    if (isTodoPublished == "PRIVATE" || isTodoPublished == "private") {
        todoPrivateAction(arg, heartContainer);
        return;
    }
}

function setEventQuoteHeart(arg, heartContainer) {

    var quoteId = arg.id;
    var heart = arg.heart;
    const isQuotePublished = arg.isPublish;
    heartContainer.innerText = heart;

    if (auth.getJsonToken() == null) {
        noticeLoginRequest();
    }
    if (isQuotePublished == "PUBLISH" || isQuotePublished == "publish") {
        heartContainer.addEventListener("click", function () {
            injectorQuoteAuthValue(quoteId, heart, heartContainer);
        });
    }
    if (isQuotePublished == "PRIVATE" || isQuotePublished == "private") {
        quotePrivateAction(arg, heartContainer);
    }
}

export {
    setEventTodoHeart,
    setEventQuoteHeart
}

// const Heart = (arg) => {

//     console.log(arg);

//     return (
//         <a id="Comment-PostID-1" className="icon solid fa-comment comment">{comment}</a>
//     );
// }