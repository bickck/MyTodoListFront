var funcServer;
var heartServer;

function setTodoHeart() {
    
}

function setVisualPublish(arg, heartContainer, commentContainer, postKind) {

    var postId = arg.id;
    var heart = arg.heart;
    var isPublish = arg.isPublish;
    var comment = arg.comment;

    if (postId == undefined) {
        return console.log("post id not exist");
    }

    if (postKind == "TODO" || postKind == "todo") {
        funcServer = todoServer;
    }

    if (postKind == "QUOTE" || postKind == "quote") {
        funcServer = quoteServer;
    }

    if (isPublish == "private" || isPublish == "PRIVATE") {

        postPrivateAction({
            postId,
            heartContainer: heartContainer,
            funcServer: funcServer,
            commentContainer: commentContainer
        })
        return;
    }
    if (isPublish == "publish" || isPublish == "PUBLISH") {
        heartContainer.innerText = heart;
    }

    if (commentContainer != null || commentContainer != undefined) {
        commentContainer.innerText = comment;
    }

    // is Auth?
    if (auth.getJsonToken() != null) {
        var result = funcServer.requestHeartExists({
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

    console.log(event);
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

function postPrivateAction(arg) {

    var postHeartContainer = arg.heartContainer;
    var postCommentContainer = arg.commentContainer;
    var executeFunctionService = arg.funcServer;

    postHeartContainer.innerText = "private";

    postHeartContainer.addEventListener("click", function changePublish() {
        postHeartContainer.innerText = 0;

        executeFunctionService.requestChangePublish({
            id: arg.postId
        });

        if (postCommentContainer != null) {
            const commentContainerParent = postCommentContainer.parentElement;
            commentContainerParent.removeAttribute("class", "actions-hidden");
            postCommentContainer.classList.remove("actions-hidden");
            postCommentContainerr.innerText = 0;
        }
        postHeartContainer.setAttribute("id", `heart-${arg.postId}`);
        postHeartContainer.setAttribute("isExists", `false`);
        postHeartContainer.setAttribute("uuid", `${null}`)
        postHeartContainer.setAttribute("value", 0);
        postHeartContainer.addEventListener("click", heartActions);
    });

    if (postCommentContainer != null) {

        const commentContainerParent = arg.commentContainer.parentElement;
        commentContainerParent.setAttribute("class", "actions-hidden");
        postCommentContainer.classList.add("actions-hidden");

        postCommentContainer.addEventListener("click", function addComment() {
            console.log("click");
            // todoApi.requestTodoCommentsByTodoId({
            //     id: arg.id
            // });
        });
    }
}