/**
 * 
 * 포스트에 컨테이너를 생성하고 데이터를 넣는 클래스
 */

import {
    setUserProfileImageUrl,
    setUserProfileCommentStr,
    refreshCommentInputElement
} from "./../generator/functions.js";

import {
    setEventTodoHeart,
    setEventQuoteHeart
} from "./action/heart.js";
import {
    setCommentEvent
} from "./../generator/action/comment.js"
import {
    setUserPageMovementEventByUserName,
    setTodoPageMovementEventByTodoImage,
    setTodoPageMovementEventByTodoTitle
} from "./../generator/action/pageMovement.js"

import {
    setUserIntroImage,
    setMainTodoImage,
    setTodoListImage
} from "./../generator/action/image.js"

import {
    ConvertDate
} from "./../util/date.js";

import {
    Todo
} from "./../server/todo.js"

import {
    Quote
} from "./../server/quote.js";

import {
    TodoApi
} from "./../api/todoapi.js";

import {
    ImageApi
} from "./../api/imageapi.js";

import {
    HeartApi
} from "./../api/heart.js";

import {
    Auth
} from "./../account/auth.js";

import {
    Comment
} from "./../util/comment.js"

const comment = new Comment();
const convert = new ConvertDate();
const imageApi = new ImageApi();
const todoApi = new TodoApi();
const quoteServer = new Quote();
const todoServer = new Todo();
const heartapi = new HeartApi();
const auth = new Auth();

export class PostGenerator {
    /**
     *  <article class="post">
     * @param {*} params 
     * @returns 
     */

    createMainPost(params) {

        // element 생성
        var articleContainer = document.createElement("article");
        var header = document.createElement("header");
        var headerContainer = document.createElement("div");
        var postId = document.createElement("p");
        var titleContainer = document.createElement("h2");
        var title = document.createElement("a");
        var subtitle = document.createElement("p");
        var metaContainer = document.createElement("div");
        var createTime = document.createElement("time");
        var userInfoContainer = document.createElement("a");
        var username = document.createElement("span");
        var userImage = document.createElement("img");
        var imageContainer = document.createElement("a");
        var image = document.createElement("img");
        var mainContent = document.createElement("p");
        var footerContainer = document.createElement("footer");
        var ulActions = document.createElement("ul");
        var ulStats = document.createElement("ul");
        var liHeart = document.createElement("li");
        var heart = document.createElement("a");
        var liComment = document.createElement("li");
        var comment = document.createElement("a");

        // 구조 설정
        titleContainer.appendChild(title);
        headerContainer.appendChild(postId);
        headerContainer.appendChild(titleContainer);
        headerContainer.appendChild(subtitle);
        userInfoContainer.appendChild(username);
        metaContainer.appendChild(createTime);
        metaContainer.appendChild(userInfoContainer);
        header.appendChild(headerContainer);
        header.appendChild(metaContainer);
        liHeart.appendChild(heart);
        liComment.appendChild(comment);
        ulStats.appendChild(liHeart);
        ulStats.appendChild(liComment);
        footerContainer.appendChild(ulActions);
        footerContainer.appendChild(ulStats);
        articleContainer.appendChild(header);
        articleContainer.appendChild(imageContainer);
        articleContainer.appendChild(mainContent);
        articleContainer.appendChild(footerContainer);

        // 내부 값 설정

        const link = "#detail-page-move";

        postId.setAttribute("id", `PostID-${params.id}`);
        comment.setAttribute("id", `Comment-PostID-${params.id}`);
        heart.setAttribute("id", `Heart-PostID-${params.id}`);

        postId.setAttribute("value", params.id);
        createTime.setAttribute("datetime", params.createTimestamp);
        imageContainer.setAttribute("href", link);

        title.setAttribute("class", "post-details");
        metaContainer.setAttribute("class", "meta");
        articleContainer.setAttribute("class", "post");
        headerContainer.setAttribute("class", "title");
        createTime.setAttribute("class", "published");
        userInfoContainer.setAttribute("class", "author");
        imageContainer.setAttribute("class", "image featured");
        username.setAttribute("class", "name");
        ulActions.setAttribute("class", "actions");
        ulStats.setAttribute("class", "stats");
        heart.setAttribute("class", "icon solid fa-heart heart");
        comment.setAttribute("class", "icon solid fa-comment comment");

        console.log(params);
        setUserIntroImage(params.userImageUUID, userImage, userInfoContainer);
        setMainTodoImage(params.id, params.postImgCount, imageContainer);
        setUserPageMovementEventByUserName(params.username, userInfoContainer);
        setTodoPageMovementEventByTodoImage(params.id, imageContainer);
        setTodoPageMovementEventByTodoTitle(params.id, title);

        setEventTodoHeart(params, heart);
        setCommentEvent(params.id, params.comment, comment);

        // view 값 설정
        title.innerText = params.title;
        subtitle.innerText = "";
        createTime.innerText = convert.convertViewDate(params.createTimeStamp);
        username.innerText = params.username;
        mainContent.innerText = params.content;

        return articleContainer;
    }

    /**
     * <div class="mini-posts">
     * 
     * @param {*} params 
     * @returns 
     */

    crateMiniPost(params) {

        // element 생성
        var articleContainer = document.createElement("article");
        var headerContainer = document.createElement("header");
        var titleContainer = document.createElement("h3");
        var postId = document.createElement("p");
        var title = document.createElement("a");
        var createTime = document.createElement("time");
        var authorImageContainer = document.createElement("a");
        var authorImage = document.createElement("img");
        var imageContainer = document.createElement("a");
        var image = document.createElement("img");

        // 구조 설정
        titleContainer.appendChild(title);
        headerContainer.appendChild(postId);
        headerContainer.appendChild(titleContainer);
        headerContainer.appendChild(createTime);
        headerContainer.appendChild(authorImageContainer);
        articleContainer.appendChild(imageContainer);
        articleContainer.appendChild(headerContainer);

        // 내부 값 설정

        articleContainer.setAttribute("class", "mini-post");
        authorImageContainer.setAttribute("class", "author");
        imageContainer.setAttribute("class", "image");
        createTime.setAttribute("class", "published");
        postId.setAttribute("hidden", "");
        postId.setAttribute("id", `PostID-${params.id}`);
        postId.setAttribute("value", params.id);
        createTime.setAttribute("datatime", params.createTimeStamp);

        // 이미지 생성
        setMainTodoImage(params.id, params.postImgCount, imageContainer);
        setUserIntroImage(params.userImageUUID, authorImage, authorImage);
        setUserPageMovementEventByUserName(params.username, userInfoContainer);
        setTodoPageMovementEventByTodoImage(params.id, imageContainer);
        setTodoPageMovementEventByTodoTitle(params.id, title);

        // view 생성
        title.innerText = params.title;
        createTime.innerText = params.createTimeStamp;

        return articleContainer;
    };

    /**
     * 
     * @param {*} params 
     * @returns 
     */

    createMiniTodos(params) {

        // element 생성
        var articleContainer = document.createElement("article");
        var headerContainer = document.createElement("header");
        var titleContainer = document.createElement("h3");
        var postId = document.createElement("p");
        var title = document.createElement("a");
        var createTime = document.createElement("time");
        var authorImageContainer = document.createElement("a");
        var authorImage = document.createElement("img");
        var imageContainer = document.createElement("a");
        var heart = document.createElement("a");
        var comment = document.createElement("a");

        // 구조 설정

        titleContainer.appendChild(title);
        headerContainer.appendChild(postId);
        headerContainer.appendChild(titleContainer);
        headerContainer.appendChild(heart);
        headerContainer.appendChild(comment);
        headerContainer.appendChild(createTime);
        headerContainer.appendChild(authorImageContainer);
        articleContainer.appendChild(headerContainer);

        // 내부 값 설정

        title.setAttribute("class", "post-details")
        articleContainer.setAttribute("class", "mini-post");
        authorImageContainer.setAttribute("class", "author");
        imageContainer.setAttribute("class", "image");
        createTime.setAttribute("class", "published");
        heart.setAttribute("class", "icon solid fa-heart heart");
        comment.setAttribute("class", "icon solid fa-comment comment");

        postId.setAttribute("hidden", "");
        postId.setAttribute("id", `PostID-${params.id}`);
        postId.setAttribute("value", params.id);
        createTime.setAttribute("datatime", params.createTimeStamp);

        if (params.postImgCount != 0) {
            articleContainer.appendChild(imageContainer);
            setMainTodoImage(params.id, params.postImgCount, imageContainer);
        }
        setUserIntroImage(params.userImageUUID, authorImage, authorImageContainer);
        setUserPageMovementEventByUserName(params.username, authorImageContainer);
        setTodoPageMovementEventByTodoImage(params.id, imageContainer);
        setTodoPageMovementEventByTodoTitle(params.id, title);
        setEventTodoHeart(params, heart);
        setCommentEvent(params.id, params.comment, comment);

        // view 생성
        title.innerText = params.title;
        createTime.innerText = convert.convertViewDate(params.createTimeStamp);
        comment.innerText = params.comment;

        return articleContainer;
    };

    /**
     * <ul class="posts">
     * 
     * @param {*} params 
     * @returns 
     */
    createPostList(params) {

        // element 생성
        var li = document.createElement("li");
        var articleContainer = document.createElement("article");
        var header = document.createElement("header");
        var postId = document.createElement("p");
        var titleContainer = document.createElement("h3");
        var title = document.createElement("a");
        var createTime = document.createElement("time");
        var imageContainer = document.createElement("a");
        var image = document.createElement("img");

        // 구조 설정
        titleContainer.appendChild(title);
        header.appendChild(postId);
        header.appendChild(titleContainer);
        header.appendChild(createTime);
        articleContainer.appendChild(imageContainer);
        articleContainer.appendChild(header);
        li.appendChild(articleContainer);

        //내부 값 설정
        createTime.setAttribute("class", "published");
        imageContainer.setAttribute("class", "image");
        createTime.setAttribute("class", "published");

        postId.setAttribute("id", `PostID-${params.id}`);
        createTime.setAttribute("datetime", params.createTimeStamp);

        // view 생성

        title.innerText = params.title;
        createTime.innerText = params.date;

        return li;
    }

    /**
     * <article class="post todo-details">
     * 
     * Todo Detail Page
     * 
     * @param {*} params 
     */

    createTodoSinglePage(params) {

        // element 생성
        var articleContainer = document.createElement("article");
        var headerContainer = document.createElement("header");
        var titleContainer = document.createElement("div");
        var todoId = document.createElement("p");
        var title = document.createElement("h2");
        var subtitle = document.createElement("p");
        var metaContainer = document.createElement("div");
        var createTimeStamp = document.createElement("time");
        var userInfoContainer = document.createElement("a");
        var username = document.createElement("span");
        var userImage = document.createElement("img");
        var imageContainer = document.createElement("div");
        var mainContent = document.createElement("p");
        var footerContainer = document.createElement("footer");
        var statsList = document.createElement("ul");
        var heartList = document.createElement("li");
        var heart = document.createElement("a");
        var commentList = document.createElement("li");
        var comment = document.createElement("a");

        // 삭제 수정 버튼 생성 필요

        titleContainer.appendChild(title);
        titleContainer.appendChild(subtitle);
        titleContainer.appendChild(todoId);
        userInfoContainer.appendChild(username);
        userInfoContainer.appendChild(userImage);
        metaContainer.appendChild(createTimeStamp);
        metaContainer.appendChild(userInfoContainer);
        heartList.appendChild(heart);
        commentList.appendChild(comment);
        statsList.appendChild(commentList);
        statsList.appendChild(heartList);
        footerContainer.appendChild(statsList);
        headerContainer.appendChild(titleContainer);
        headerContainer.appendChild(metaContainer);
        articleContainer.appendChild(headerContainer);
        articleContainer.appendChild(imageContainer);
        articleContainer.appendChild(mainContent);
        articleContainer.appendChild(footerContainer);

        // 내부 값 설정
        articleContainer.setAttribute("class", "post todo-details");
        titleContainer.setAttribute("class", "title");
        metaContainer.setAttribute("class", "meta");
        createTimeStamp.setAttribute("class", "published")
        userInfoContainer.setAttribute("class", "author");
        username.setAttribute("class", "name");
        statsList.setAttribute("class", "stats");
        heart.setAttribute("class", "icon solid fa-heart heart");
        comment.setAttribute("class", "icon solid fa-comment comment");

        todoId.setAttribute("id", `TodoID-${params.id}`);
        todoId.setAttribute("value", params.id);
        createTimeStamp.setAttribute("datetime", params.createTimeStamp);


        setTodoDetailImage(params.id, params.postImgCount, imageContainer);

        // setPostImage(params.id, userImgCount,mainContentImage,"POST")
        // 이미지 생성

        // setVisualPublish({
        //     id: params.id,
        //     heart: params.heart,
        //     isPublish: params.isPublish
        // }, heart, comment, "TODO");


        //view 이미지 생성
        title.innerText = params.title;
        subtitle.innerText = "";
        createTimeStamp.innerText = convert.convertViewDate(params.createTimeStamp);
        username.innerText = params.username;
        mainContent.innerText = params.content;
        heart.innerText = params.heart;
        comment.innerText = params.comment;

        return articleContainer;
    }

    /**
     * 
     * @param {*} params 
     * @returns 
     */

    createQuoteList(params) {

        // element 생성
        var li = document.createElement("li");
        var articleContainer = document.createElement("article");
        var header = document.createElement("header");
        var quoteContainer = document.createElement("h3");
        var quoteId = document.createElement("p");
        var author = document.createElement("p");
        var ulContainer = document.createElement("ul");
        var liHeartContainer = document.createElement("li");
        var heart = document.createElement("a");
        var liCreateTimeContainer = document.createElement("li");
        var createTime = document.createElement("time");

        // 구조 생성
        liHeartContainer.appendChild(heart);
        liCreateTimeContainer.appendChild(createTime);
        ulContainer.appendChild(liHeartContainer);
        ulContainer.appendChild(liCreateTimeContainer);
        header.append(quoteId);
        header.appendChild(quoteContainer);
        header.appendChild(author);
        header.appendChild(ulContainer);
        articleContainer.appendChild(header);
        li.appendChild(articleContainer);

        ulContainer.setAttribute("class", "stats");
        heart.setAttribute("class", "icon solid fa-heart");
        createTime.setAttribute("class", "published");
        quoteId.setAttribute("hidden", "");
        quoteId.setAttribute("id", `QuoteId-${params.id}`);
        quoteId.setAttribute("value", params.id);
        quoteContainer.setAttribute("value", params.quote);
        author.setAttribute("value", params.author);
        createTime.setAttribute("datetime", params.createTimeStamp);

        setEventTodoHeart(params, heart);

        // view 생성
        quoteContainer.innerText = params.quote;
        author.innerText = ` ${params.author} `
        createTime.innerText = convert.convertViewDate(params.createTimestamp);
        heart.innerText = params.heart;

        return li;
    }

    /**
     * 
     * <ul class="posts daliy-todos">
     * 
     * @param {*} params 
     * @returns 
     */

    createTodoList(params) {

        // element 생성
        var li = document.createElement("li");
        var articleContainer = document.createElement("article");
        var header = document.createElement("header");
        var titleContainer = document.createElement("h3");
        var todoId = document.createElement("p");
        var title = document.createElement("a");
        var createTime = document.createElement("time");
        var todoImageContainer = document.createElement("a");

        // 구조 생성
        titleContainer.appendChild(title);
        header.appendChild(todoId);
        header.appendChild(titleContainer);
        header.appendChild(createTime);
        articleContainer.appendChild(header);
        li.appendChild(articleContainer);

        title.setAttribute("class", "post-details");
        todoImageContainer.setAttribute("class", "image post-details");
        createTime.setAttribute("class", "published");
        todoId.setAttribute("hidden", "");
        todoId.setAttribute("id", `TodoId-${params.id}`);
        todoId.setAttribute("value", params.id);
        title.setAttribute("value", params.title);
        createTime.setAttribute("datetime", params.createTimeStamp);

        if (params.postImgCount != 0) {
            articleContainer.appendChild(todoImageContainer);
            setTodoListImage(params.id, params.postImgCount, todoImageContainer);

        }
        setTodoPageMovementEventByTodoImage(params.id, todoImageContainer);
        setTodoPageMovementEventByTodoTitle(params.id, title);

        // // view 생성
        title.innerText = params.title;
        createTime.innerText = convert.convertViewDate(params.createTimeStamp);

        return li;
    }

    /**
     * <!-- About -->
     * <section class="blurb">
     * 
     * @param {*} params 
     * @returns 
     */

    createBlurd(params) {

        // element 생성
        var blurdSection = document.createElement("section");
        var h2 = document.createElement("h2");
        var content = document.createElement("p");
        var ulActions = document.createElement("ul");
        var liAction = document.createElement("li");
        var aAction = document.createElement("a");

        //내부 값 설정
        blurdSection.setAttribute("class", "blurb");
        ulActions.setAttribute("class", "actions")
        aAction.setAttribute("href", "");
        aAction.setAttribute("class", "button");

        // 구조 생성
        ulActions.appendChild(liAction);
        blurdSection.appendChild(h2);
        blurdSection.appendChild(content);
        blurdSection.appendChild(ulActions);

        h2.innerText = params.title;
        content.innerText = params.content;

        return blurdSection;
    }

    /**
     * <article class="post quote">
     * 
     * @param {*} params 
     * @returns 
     */

    createMainQuote(params) {
        // element 생성

        var articleContainer = document.createElement("article");
        var headerContainer = document.createElement("header");
        var headerTitle = document.createElement("div");
        var quoteId = document.querySelector("p");
        var quote = document.createElement("h3");
        var author = document.createElement("p");
        var metaContainer = document.createElement("div");
        var createTime = document.createElement("time");
        var userInfoContainer = document.createElement("a");
        var username = document.createElement("span");
        var userImage = document.createElement("img");
        var footerContainer = document.createElement("footer");
        var ulStats = document.createElement("ul");
        var liHeart = document.createElement("li");
        var heart = document.createElement("a");

        // 구조 생성
        headerTitle.appendChild(quoteId);
        headerTitle.appendChild(quote);
        headerTitle.appendChild(author);
        userInfoContainer.appendChild(username);
        metaContainer.appendChild(createTime);
        metaContainer.appendChild(userInfoContainer);
        headerContainer.appendChild(headerTitle);
        headerContainer.appendChild(metaContainer);
        liHeart.appendChild(heart);
        ulStats.appendChild(liHeart);
        footerContainer.appendChild(ulStats);
        articleContainer.appendChild(headerContainer);
        articleContainer.appendChild(footerContainer);

        //내부 값 설정
        articleContainer.setAttribute("class", "post quote");
        headerTitle.setAttribute("class", "title");
        metaContainer.setAttribute("class", "meta");
        createTime.setAttribute("class", "published");
        userInfoContainer.setAttribute("class", "author");
        ulStats.setAttribute("class", "stats");
        heart.setAttribute("class", "icon solid fa-heart heart");
        userInfoContainer.setAttribute("href", "#user");
        username.setAttribute("class", "username");

        quoteId.setAttribute("id", `QuoteID-${params.id}`);
        quote.setAttribute("id", "quote");
        author.setAttribute("id", "author")
        quoteId.setAttribute("value", params.id);
        username.setAttribute("value", params.username);
        quote.setAttribute("value", params.quote);
        author.setAttribute("value", params.author);
        createTime.setAttribute("datetime", params.createTimestamp);
        heart.setAttribute("value", params.heart);
        quoteId.setAttribute("hidden", "");

        // 이미지 생성
        setUserIntroImage(params.userImageUUID, userImage, userInfoContainer);
        setEventQuoteHeart(params, heart);
    
        // view 생성
        quoteId.innerText = params.id;
        quote.innerText = params.quote;
        author.innerText = params.author;
        heart.innerText = params.heart;
        createTime.innerText = convert.convertViewDate(params.createTimestamp);
        username.innerText = params.username;

        return articleContainer;
    }


    /**
     * 
     *  <li>
            <input id="files" class="files" type="file" multiple="multiple"></input>
            <label for="files" class="button icon solid fa-plus image"></label>
        </li>	
     * 
     * @param {*} id 
     * @returns 
     */

    createPreViewImageContainer(id) {

        const li = document.createElement("li");
        const input = document.createElement("input");
        const label = document.createElement("label");

        input.setAttribute("id", `files${id}`);
        input.setAttribute("class", "files");
        input.setAttribute("type", `file`);

        label.setAttribute("for", `files${id}`);
        label.setAttribute("class", "button icon solid fa-plus image");

        li.appendChild(input);
        li.appendChild(label);

        return li;
    }

    /**
     * 
     * @param {*} params 
     * @returns 
     */

    // createMainQuote(params) {
    //     // element 생성

    //     var articleContainer = document.createElement("article");
    //     var headerContainer = document.createElement("header");
    //     var headerTitle = document.createElement("div");
    //     var quoteId = document.querySelector("p");
    //     var quote = document.createElement("h3");
    //     var author = document.createElement("p");
    //     var metaContainer = document.createElement("div");
    //     var createTime = document.createElement("time");
    //     var userInfoContainer = document.createElement("a");
    //     var username = document.createElement("span");
    //     var userImage = document.createElement("img");
    //     var footerContainer = document.createElement("footer");
    //     var ulStats = document.createElement("ul");
    //     var liHeart = document.createElement("li");
    //     var heart = document.createElement("a");

    //     // 구조 생성
    //     headerTitle.appendChild(quoteId);
    //     headerTitle.appendChild(quote);
    //     headerTitle.appendChild(author);
    //     userInfoContainer.appendChild(username);
    //     metaContainer.appendChild(createTime);
    //     metaContainer.appendChild(userInfoContainer);
    //     headerContainer.appendChild(headerTitle);
    //     headerContainer.appendChild(metaContainer);
    //     liHeart.appendChild(heart);
    //     ulStats.appendChild(liHeart);
    //     footerContainer.appendChild(ulStats);
    //     articleContainer.appendChild(headerContainer);
    //     articleContainer.appendChild(footerContainer);

    //     //내부 값 설정

    //     articleContainer.setAttribute("class", "post quote");
    //     headerTitle.setAttribute("class", "title");
    //     metaContainer.setAttribute("class", "meta");
    //     createTime.setAttribute("class", "published");
    //     userInfoContainer.setAttribute("class", "author");
    //     ulStats.setAttribute("class", "stats");
    //     heart.setAttribute("class", "icon solid fa-heart heart");
    //     userInfoContainer.setAttribute("href", "#user");
    //     username.setAttribute("class", "username");

    //     quoteId.setAttribute("id", `QuoteID-${params.id}`);
    //     quote.setAttribute("id", "quote");
    //     author.setAttribute("id", "author")

    //     quoteId.setAttribute("value", params.id);
    //     username.setAttribute("value", params.username);
    //     quote.setAttribute("value", params.quote);
    //     author.setAttribute("value", params.author);
    //     createTime.setAttribute("datetime", params.createTimestamp);
    //     heart.setAttribute("value", params.heart);
    //     quoteId.setAttribute("hidden", "");

    //     // view 생성
    //     quoteId.innerText = params.id;
    //     quote.innerText = params.quote;
    //     author.innerText = params.author;
    //     heart.innertText = params.heart;
    //     createTime.innerText = convert.convertViewDate(params.createTimestamp);
    //     username.innerText = params.username;

    //     return articleContainer;
    // }

}

function openCommentLayer(event) {

    var targetId = event.target.id.split("-")[2];
    var main = document.querySelector("body");

    var layer = comment.createCommentLayer({
        id: targetId
    }, addComment, closeCommentLayer);


    var result = todoApi.requestTodoCommentsByTodoId({
        id: targetId
    });

    result.then((data) => {
        if (data == null || data.content.length == 0) {
            var arg = {
                title: "데이터가 없어요."
            }

            var section = comment.createCommentElement(arg);
            layer.commentContainer.appendChild(section);
            main.appendChild(layer.commentLayer);

        } else {

            for (var i = 0; i < data.numberOfElements; i++) {
                var section = comment.createCommentElement(data.content[i]);
                layer.commentContainer.appendChild(section);
            }
            main.appendChild(layer.commentLayer);
        }
    });
}

function reloadTodoCommeandData(todoId) {

    clearCommentList();

    var layer = comment.createCommentLayer({
        id: todoId
    }, addComment, closeCommentLayer);

    var result = todoApi.requestTodoCommentsByTodoId({
        id: todoId
    });

    result.then((data) => {
        for (var i = 0; i < data.numberOfElements; i++) {
            var section = comment.createCommentElement(data.content[i]);
            layer.commentContainer.appendChild(section);
        }
        main.appendChild(layer.commentLayer);

    });
}

function addComment(event) {
    const todo_Id = document.querySelector("#TodoID").getAttribute("todo_id");
    const comment = document.getElementById("comment_form").elements[0].value;

    var result = todoServer.requestSaveCommentByTodoId({
        id: todo_Id,
        comment: comment
    });

    result.then((data) => {
        if (data == "SUCCESS") {
            reloadTodoCommeandData(todo_Id);
        }
    })
}


function clearCommentList(todoId) {
    var childSize = layer.commentContainer.childElementCount;

    for (var i = 0; i < childSize; i++) {
        layer.commentContainer.removeChild(layer.commentContainer.childNodes[i]);
    }
}

function closeCommentLayer(event) {
    comment.removeCommentLayer();
}
