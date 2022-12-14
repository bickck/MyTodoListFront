import {
    Todo
} from "./../../server/todo.js";
import {
    Quote
} from "./../../server/quote.js";

const todo = new Todo();
const quote = new Quote();

function setTodoHeart(arg) {

    var postId = arg.id;
    var heart = arg.heart;
    const isPublish = arg.isPublish;

    if (isPublish == "private" || isPublish == "PRIVATE") {

        postPrivateAction({
            postId,
            heartContainer: heartContainer,
            funcServer: funcServer });
        return;
    }

    if (auth.getJsonToken() != null)  {
        injectorTodoAuthValue(arg);
    }

    postPublishAction();
    heartContainer.innerText = heart;

}

function setQuoteHeart(arg) {

    var postId = arg.id;
    var heart = arg.heart;
    const isPublish = arg.isPublish;

    if (isPublish == "private" || isPublish == "PRIVATE") {

        postPrivateAction({
            postId,
            heartContainer: heartContainer,
            funcServer: funcServer
        })
        return;
    }
}

/**
 * 
 * @param {*} arg 
 */

function postPublishAction(arg) {

}

/**
 * 
 * @param {*} arg 
 */

function injectorTodoAuthValue(arg){

    if (auth.getJsonToken() != null) {
        var result = todo.requestHeartExists({
            id: postId
        });

        result.then((exists) => {

            if (exists == "true") {
                heartContainer.setAttribute("id", `heart-${postId}`);
                heartContainer.setAttribute("id", `heart-postid-${postId}`);
                heartContainer.setAttribute("isExists", `${exists.exists}`);
                heartContainer.setAttribute("uuid", `${exists.uuid}`)
                heartContainer.setAttribute("value", heart);
                heartContainer.addEventListener("click", heartActions);

            } else {
                heartContainer.setAttribute("id", `heart-${postId}`);
                heartContainer.setAttribute("isExists", `${exists.exists}`);
                heartContainer.setAttribute("uuid", `${exists.uuid}`)
                heartContainer.setAttribute("value", heart);
                heartContainer.addEventListener("click", heartActions);
            }
        });

    } else {
        heartContainer.setAttribute("id", `heart-${postId}`)
        heartContainer.setAttribute("value", heart);
        heartContainer.addEventListener("click", heartActions);
    }
}

/**
 * 
 * @param {*} arg 
 */

function injectorQuoteAuthValue(arg){

    if (auth.getJsonToken() != null) {
        var result = quote.requestHeartExists({
            id: postId
        });

        result.then((exists) => {

            if (exists == "true") {
                heartContainerValueInjector(heartContainer,{
                    postId : postId,
                    exists : exists,
                    uuid : uuid,
                    heartCounter : heart
                });
                heartContainer.addEventListener("click", heartActions);

            } else {
                heartContainerValueInjector(heartContainer,{
                    postId : postId,
                    exists : exists,
                    uuid : uuid,
                    heartCounter : heart
                });
                heartContainer.addEventListener("click", heartActions);
            }
        });

    } else {
        heartContainerValueInjector(heartContainer,{
            postId : postId,
            exists : exists,
            uuid : uuid,
            heartCounter : heart
        });
        heartContainer.addEventListener("click", heartActions);
    }
}


/**
 * 
 * @param {*} heartuuid 
 * @param {*} postId 
 * @param {*} heart 
 * @param {*} heartContainer 
 * @returns 
 */

function cancleHeart(heartuuid, postId, heart, heartContainer) {

    if (heart == 0) {
        return;
    }

    var decreaseHeart = Number(heart) - 1;
    heartContainer.innerText = decreaseHeart;
    heartContainer.setAttribute("id", `heart-${postId}`);
    heartContainer.setAttribute("isExists", `false`);
    heartContainer.setAttribute("uuid", `${null}`)
    heartContainer.setAttribute("value", decreaseHeart);

    funcServer.requestCancleHeart({
        id: heartuuid
    });
}

function addHeart(postId, heart, heartContainer) {

    var increaseHeart = Number(heart) + 1;
    heartContainer.innerText = increaseHeart;
    heartContainer.setAttribute("id", `heart-${postId}`);
    heartContainer.setAttribute("isExists", `true`);
    heartContainer.setAttribute("uuid", `${null}`)
    heartContainer.setAttribute("value", increaseHeart);

    var result = funcServer.requestSaveHeart({
        id: postId
    });

    result.then((data) => {
        heartContainer.setAttribute("uuid", `${data}`)
    });

}

/**
 * 
 * @param {*} event 
 */



function heartActions(event) {

    var heartContainer = event.target;
    var postid = heartContainer.id.split("-")[1];
    var uuid = heartContainer.getAttribute("uuid");
    var isExists = heartContainer.getAttribute("isExists");
    var heartValue = heartContainer.getAttribute("value");

    //no login
    if (auth.getJsonToken() == null) {
        console.log("login Please");
    }

    // pressed heart
    if (isExists == "false") {
        addHeart(postid, heartValue, heartContainer);
    }

    // cancle heart press
    if (isExists == "true") {
        cancleHeart(uuid, postid, heartValue, heartContainer);
    }
}



/**
 * 
 * @param {*} arg 
 */

function todoPrivateAction(arg) {

    var todoHeartContainer = arg.heartContainer;

    todoHeartContainer.innerText = "private";

    todoHeartContainer.addEventListener("click", function changePublish() {
        todoHeartContainer.innerText = 0;

        todo.requestChangePublish({
            id: arg.postId
        });

        postHeartContainer.setAttribute("id", `heart-${arg.postId}`);
        postHeartContainer.setAttribute("isExists", `false`);
        postHeartContainer.setAttribute("uuid", `${null}`)
        postHeartContainer.setAttribute("value", 0);
        postHeartContainer.addEventListener("click", heartActions);
    });
}

/**
 * 
 * @param {*} arg 
 */

function quotePrivateAction(arg) {

    var quoteHeartContainer = arg.heartContainer;

    quoteHeartContainer.innerText = "private";

    quoteHeartContainer.addEventListener("click", function changePublish() {
        quoteHeartContainer.innerText = 0;

        quote.requestChangePublish({
            id: arg.postId
        });
        heartContainerValueInjector(quoteHeartContainer,{
            postId : postId,
            isExists : `false`,
            uuid : null,
            heartCounter : 0
        })
        quoteHeartContainer.setAttribute("id", `heart-${arg.postId}`);
        quoteHeartContainer.setAttribute("isExists", `false`);
        quoteHeartContainer.setAttribute("uuid", `${null}`)
        quoteHeartContainer.setAttribute("value", 0);
        quoteHeartContainer.addEventListener("click", function() {
            addHeart();
        } );
    });
}

function heartContainerValueInjector(container,arg) {
    container.setAttribute("id", `heart-${arg.postId}`);
    container.setAttribute("isExists", `${arg.isExists}`);
    container.setAttribute("uuid", `${arg.uuid}`);
    container.setAttribute("value", arg.heartCounter);
}