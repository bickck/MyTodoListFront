/**
 * 
 * 포스트에 컨테이너를 생성하고 데이터를 넣는 클래스
 */
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
    Action
} from "./../function/action.js";

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

const convert = new ConvertDate();
const imageApi = new ImageApi();
const todoApi = new TodoApi();
const quoteServer = new Quote();
const todoServer = new Todo();
const heartapi = new HeartApi();
const auth = new Auth();
// const action = new Action();


export class PostGenerator {
    // <article class="post">
    // 		<header>
    // 			<div class="title">
    // 				<h2><a href="single.html">Magna sed adipiscing</a></h2>
    // 				<p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
    //  		</div>
    // 			<div class="meta">
    // 				<time class="published" datetime="2015-11-01">November 1, 2015</time>
    // 				<a href="#" class="author"><span class="name">Jane Doe</span><img src="images/avatar.jpg" alt="" /></a>
    // 			</div>
    // 		</header>
    // 		<a href="single.html" class="image featured"><img src="images/pic01.jpg" alt="" /></a>
    // 		<p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
    // 		<footer>
    // 			<ul class="actions">
    // 				<li><a href="single.html" class="button large">Continue Reading</a></li>
    // 			</ul>
    // 			<ul class="stats">
    // 				<li><a href="#">General</a></li>
    // 				<li><a href="#" class="icon solid fa-heart">28</a></li>
    // 				<li><a href="#" class="icon solid fa-comment">128</a></li>
    // 			</ul>
    // 		</footer>
    // 	</article>'

    /**
     * 
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


        // post, user 이미지 세팅

        //setPostImage(params.id, params.userImgCount,userImage,userInfoContainer,"USER");

        // is check user img generator
        if (params.userImgCount != null && typeof params.userImgCount != "undefined" && params.userImgCount != 0) {

            const imageInfo = imageApi.requestUserImage(params.id);

            imageInfo.then((data) => {
                const imageSource = backEndServerAddress + `/${data.filePath} + /${data.fileName}`;

                userImage.setAttribute("src", imageSource);

            });

            userInfoContainer.appendChild(userImage);
        }

        setPostImage(params.id, params.postImgCount, image, imageContainer, "POST");


        // 공개 여부 설정

        setVisualPublish({
            id: params.id,
            heart: params.heart,
            comment: params.comment,
            isPublish: params.isPublish
        }, heart, comment, "TODO");


        // 이벤트 설정

        // click 시 user detail page로 이동
        setDetailPageMoveEvent(params.id, {
            userInfoContainer: userInfoContainer,
            imageContainer: imageContainer,
            title: title
        });


        // view 값 설정
        title.innerText = params.title;
        subtitle.innerText = "";
        createTime.innerText = convert.convertViewDate(params.createTimeStamp);
        username.innerText = params.username;
        mainContent.innerText = params.content;
        // heart.innerText = params.heart;
        // comment.innerText = params.comment;

        return articleContainer;
    }

    // <section>
    //     <div class="mini-posts">

    //         <!-- Mini Post -->
    //             <article class="mini-post">
    //                 <header>
    //                     <h3><a href="single.html">Vitae sed condimentum</a></h3>
    //                     <time class="published" datetime="2015-10-20">October 20, 2015</time>
    //                     <a href="#" class="author"><img src="images/avatar.jpg" alt="" /></a>
    //                 </header>
    //                 <a href="single.html" class="image"><img src="images/pic04.jpg" alt="" /></a>
    //             </article>
    //     </div>
    // </section>

    /**
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
        if (params.postImgCount != null && typeof params.postImgCount != "undefined" && params.postImgCount != 0) {

            const imageInfo = imageApi.requestTodoImageById({
                id: params.id
            });

            // post image 가져오기
            imageInfo.then((data) => {
                const imageSource = backEndServerAddress + `/${filePath}` + `/${fileName}`;
                image.setAttribute("src", imageSource);
            });

            imageContainer.appendChild(image);
        }

        if (params.userImgCount != null && typeof params.userImgCount != "undefined" && params.userImgCount != 0) {

            const imageInfo = imageApi.requestUserImage(params.id);

            imageInfo.then((data) => {
                const imageSource = backEndServerAddress + `/${data.filePath} + /${data.fileName}`;

                userImage.setAttribute("src", imageSource);
            });

            authorImageContainer.appendChild(authorImage);
        }

        /**
         * 
         * 서버로 부터 받은 이미지 개수 정보가 0이 아니라면 이미지 정보를 가져오거나 서버가 이미지 개수가 아닌 위치를 준다면 그 위치를 넣기
         * 서버로 부터 이미지 정보가 아닌 개수를 파악하는 로직을 만든 이유 :
         * 쿼리를 만들기 어려움 개수가 1개 일 경우는 만들기 쉽지만 2개 이상일 경우는 쿼리를 만들기 어렵다고 판단하여 개수만을 가져오는 로직을 설계
         * 
         * 파일을 확인하는 이유는 다른 Todo를 만들 때 서버 Query가 이미지 경로를 줬을 때를 가정했기 때문
         */

        if (params.fileName != null && typeof params.fileName != "undefined" && params.filePath != null && typeof params.filePath != "undefined") {

        }


        // 공개여부 설정

        // if (params.isPublish == "private") {
        //     heart.innerText = "private";
        //     heart.addEventListener("click", function changePublish() {
        //         quoteServer.requestChangeQuotePublish({
        //             id: params.id
        //         });

        //     });
        // } else {
        //     heart.innerText = params.heart;
        //     heart.addEventListener("click", function addHeart() {
        //         quoteServer.requestSaveQuoteHeart({
        //             id: params.id
        //         });
        //     });
        // }

        // 이벤트 생성
        // title.setAttribute("href", "#title");
        // authorImageContainer.setAttribute("href", "#author");
        // imageContainer.setAttribute("href", "#");



        title.addEventListener("click", function postDetails() {
            const url = frontEndServerAddress + "";

            window.localStorage.setItem("todo_id", params.id);

            window.location.href = url;
        });

        imageContainer.addEventListener("click", function postDetails() {
            const url = frontEndServerAddress + "";

            window.localStorage.setItem("todo_id", params.id);

            window.location.href = url;
        });

        authorImageContainer.addEventListener("click", function userDetailsPage() {
            const url = frontEndServerAddress + "";

        });




        // view 생성

        title.innerText = params.title;
        createTime.innerText = params.createTimeStamp;


        return articleContainer;
    };

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
        var image = document.createElement("img");
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
        articleContainer.appendChild(imageContainer);

        // 내부 값 설정

        title.setAttribute("class", "post-details")
        articleContainer.setAttribute("class", "mini-post");
        authorImageContainer.setAttribute("class", "author");
        imageContainer.setAttribute("class", "image");
        createTime.setAttribute("class", "published");
        heart.setAttribute("class", "icon solid fa-heart");
        comment.setAttribute("class", "icon solid fa-comment");

        postId.setAttribute("hidden", "");
        postId.setAttribute("id", `PostID-${params.id}`);
        postId.setAttribute("value", params.id);
        createTime.setAttribute("datatime", params.createTimeStamp);
        heart.setAttribute("href", "#");
        comment.setAttribute("href", "#");

        // 이미지 생성
        // if (params.postImgCount != null && typeof params.postImgCount != "undefined" && params.postImgCount != 0) {

        //     const imageInfo = imageApi.requestTodoImageById({
        //         id: params.id
        //     });

        //     // post image 가져오기
        //     imageInfo.then((data) => {
        //         const imageSource = backEndServerAddress + `/${filePath}` + `/${fileName}`;
        //         image.setAttribute("src", imageSource);
        //     });

        //     imageContainer.appendChild(image);
        // }

        setPostImage(params.id, params.postImgCount, image, imageContainer, "POST")

        if (params.userImgCount != null && typeof params.userImgCount != "undefined" && params.userImgCount != 0) {

            const imageInfo = imageApi.requestUserImage(params.id);

            imageInfo.then((data) => {
                const imageSource = backEndServerAddress + `/${data.filePath} + /${data.fileName}`;

                userImage.setAttribute("src", imageSource);
            });

            authorImageContainer.appendChild(authorImage);
        }

        /**
         * 
         * 서버로 부터 받은 이미지 개수 정보가 0이 아니라면 이미지 정보를 가져오거나 서버가 이미지 개수가 아닌 위치를 준다면 그 위치를 넣기
         * 서버로 부터 이미지 정보가 아닌 개수를 파악하는 로직을 만든 이유 :
         * 쿼리를 만들기 어려움 개수가 1개 일 경우는 만들기 쉽지만 2개 이상일 경우는 쿼리를 만들기 어렵다고 판단하여 개수만을 가져오는 로직을 설계
         * 
         * 파일을 확인하는 이유는 다른 Todo를 만들 때 서버 Query가 이미지 경로를 줬을 때를 가정했기 때문
         */


        // 공개여부 설정

        if (params.isPublish == "private") {
            heart.innerText = "private";
            heart.addEventListener("click", function changePublish() {
                quoteServer.requestChangePublish({
                    id: params.id
                });

            });
        } else {
            heart.innerText = params.heart;
            heart.addEventListener("click", function addHeart() {
                heart.innerText += 1;
                quoteServer.requestSaveHeart({
                    id: params.id
                });
            });
        }

        // 이벤트 생성
        // title.setAttribute("href", "#title");
        // authorImageContainer.setAttribute("href", "#author");
        // imageContainer.setAttribute("href", "#");



        title.addEventListener("click", function postDetails() {
            const url = frontEndServerAddress + "";

            window.localStorage.setItem("todo_id", params.id);

            window.location.href = url;
        });

        imageContainer.addEventListener("click", function postDetails() {
            const url = frontEndServerAddress + "";

            window.localStorage.setItem("todo_id", params.id);

            window.location.href = url;
        });

        authorImageContainer.addEventListener("click", function userDetailsPage() {

            const url = frontEndServerAddress + "";
        });




        // view 생성

        title.innerText = params.title;
        createTime.innerText = convert.convertViewDate(params.createTimeStamp);
        comment.innerText = params.comment;

        return articleContainer;
    };

    /* <section>
        <ul class="posts">
            <li>
                <article>
                    <header>
                        <h3><a href="single.html">Lorem ipsum fermentum ut nisl vitae</a></h3>
                        <time class="published" datetime="2015-10-20">October 20, 2015</time>
                    </header>
                    <a href="single.html" class="image"><img src="images/pic08.jpg" alt="" /></a>
                </article>
            </li>
        </ul>
    </section> */

    /**
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

        // 공개여부 설정

        // if (params.isPublish == "private") {
        //     heart.innerText = "private";
        //     heart.addEventListener("click", function changePublish() {
        //         quoteServer.requestChangeQuotePublish({
        //             id: params.id
        //         });

        //     });
        // } else {
        //     heart.innerText = params.heart;
        //     heart.addEventListener("click", function addHeart() {
        //         quoteServer.requestSaveQuoteHeart({
        //             id: params.id
        //         });
        //     });
        // }

        // 이미지 생성
        if (params.postImgCount != null && typeof params.postImgCount != "undefined" && params.postImgCount != 0) {
            // post image 가져오기

            const imageInfo = imageApi.requestTodoImageById({
                id: params.id
            });

            imageInfo.then((data) => {

                const imageSource = backEndServerAddress + `/${filePath}` + `/${fileName}`;
                image.setAttribute("src", imageSource);

            });

            imageContainer.appendChild(image);
        }

        //이벤트 생성

        title.addEventListener("click", function postDetail() {

            const url = frontEndServerAddress + "/assets/html/tododetails.html"

            window.localStorage.setItem("todo_id", params.id);

            window.location.href = url;
        });

        imageContainer.addEventListener("click", function postDetail() {

        });



        /**
         * 
         * 서버로 부터 받은 이미지 개수 정보가 0이 아니라면 이미지 정보를 가져오거나 서버가 이미지 개수가 아닌 위치를 준다면 그 위치를 넣기
         * 서버로 부터 이미지 정보가 아닌 개수를 파악하는 로직을 만든 이유 :
         * 쿼리를 만들기 어려움 개수가 1개 일 경우는 만들기 쉽지만 2개 이상일 경우는 쿼리를 만들기 어렵다고 판단하여 개수만을 가져오는 로직을 설계
         * 
         * 파일을 확인하는 이유는 다른 Todo를 만들 때 서버 Query가 이미지 경로를 줬을 때를 가정했기 때문
         */

        if (params.fileName != null && typeof params.fileName != "undefined" && params.filePath != null && typeof params.filePath != "undefined") {

        }

        // view 생성


        title.innerText = params.title;
        createTime.innerText = params.date;

        return li;
    }

    // <ul class="posts quote">
    //     <li>
    //     <article>
    //         <header>
    //             <h3><a id="" href="single.html">Main QUote</a></h3>
    //             <h4 id="author">-author-</h4>
    //             <ul class="actions">
    //                 <li><a href="#" class="icon solid fa-heart">0</a></li>
    //                 <li><time class="published" datetime="2015-10-20">October 20, 2015</time></li>
    //             </ul>
    //           </header>
    //         </article>
    //     </li>
    // </ul>


    //    <article class="post todo-details">
    //     <header>
    //         <div class="title">
    //             <h2><a href="#">Magna sed adipiscing</a></h2>
    //             <p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
    //         </div>
    //         <div class="meta">
    //             <time class="published" datetime="2015-11-01">November 1, 2015</time>
    //             <a href="#" class="author">
    //                 <span class="name">Jane Doe</span>
    //                 <img src="images/avatar.jpg"alt="" />
    //             </a>
    //         </div>
    //     </header>
    //     <span class="image featured"><img src="./../../images/pic01.jpg" alt="" /></span>
    //     <span class="image featured"><img src="./../../images/pic01.jpg" alt="" /></span>
    //     <span class="image featured"><img src="./../../images/pic01.jpg" alt="" /></span>
    //     <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod
    //         placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non
    //         congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta
    //         lectus vitae, ultricies congue gravida diam non fringilla.</p>
    //     <p>Nunc quis dui scelerisque, scelerisque urna ut, dapibus orci. Sed vitae condimentum lectus, ut
    //         imperdiet quam. Maecenas in justo ut nulla aliquam sodales vel at ligula. Sed blandit diam odio, sed
    //         fringilla lectus molestie sit amet. Praesent eu tortor viverra lorem mattis pulvinar feugiat in
    //         turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
    //         Fusce ullamcorper tellus sit amet mattis dignissim. Phasellus ut metus ligula. Curabitur nec leo
    //         turpis. Ut gravida purus quis erat pretium, sed pellentesque massa elementum. Fusce vestibulum porta
    //         augue, at mattis justo. Integer sed sapien fringilla, dapibus risus id, faucibus ante. Pellentesque
    //         mattis nunc sit amet tortor pellentesque, non placerat neque viverra. </p>
    //     <footer>
    //         <ul class="stats">
    //             <li><a href="#">General</a></li>
    //             <li><a href="#" class="icon solid fa-heart">28</a></li>
    //             <li><a href="#" class="icon solid fa-comment">128</a></li>
    //         </ul>
    //     </footer>
    // </article>


    /**
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

        // titleSize.appendChild(title);
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
        heart.setAttribute("class", "icon solid fa-heart");
        comment.setAttribute("class", "icon solid fa-comment");

        todoId.setAttribute("id", `TodoID-${params.id}`);
        todoId.setAttribute("value", params.id);
        createTimeStamp.setAttribute("datetime", params.createTimeStamp);


        setTodoDetailImage(params.id, params.postImgCount, imageContainer);

        // setPostImage(params.id, userImgCount,mainContentImage,"POST")
        // 이미지 생성

        setVisualPublish({
            id: params.id,
            heart: params.heart,
            isPublish: params.isPublish
        }, heart, comment, "TODO");

        // 커멘트 전용 팝업 or 리스트 필요



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
     * <li>
     *  <article>
     *      <header>
     *          <p hidden="" id="QuoteId-1" value="1"></p>
     *          <h3><p value="test1234">test1234</p></h3>
     *          <h4 value="author1234"> author1234 </h4>
     *          <ul class="stats">
     *           <li><a class="icon solid fa-heart">0</a></li>
     *           <li><time class="published" datetime="undefined">November 15. 2022</time></li>
     *          </ul>
     *      </header>
     *  </article>
     * </li>
     */

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
        //var quote = document.createElement("p");
        var author = document.createElement("p");
        var ulContainer = document.createElement("ul");
        var liHeartContainer = document.createElement("li");
        var heart = document.createElement("a");
        var liCreateTimeContainer = document.createElement("li");
        var createTime = document.createElement("time");

        // 구조 생성
        //quoteContainer.appendChild(quote);
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


        // 공개 여부 설정

        setVisualPublish({
            id: params.id,
            heart: params.heart,
            isPublish: params.isPublish
        }, heart, null, "QUOTE");

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
        var todoImage = document.createElement("img");

        // 구조 생성
        titleContainer.appendChild(title);
        header.appendChild(todoId);
        header.appendChild(titleContainer);
        header.appendChild(createTime);
        articleContainer.appendChild(header);
        articleContainer.appendChild(todoImageContainer);
        li.appendChild(articleContainer);

        title.setAttribute("class", "post-details");
        todoImageContainer.setAttribute("class", "image post-details");
        createTime.setAttribute("class", "published");
        todoId.setAttribute("hidden", "");
        todoId.setAttribute("id", `TodoId-${params.id}`);
        todoId.setAttribute("value", params.id);
        title.setAttribute("value", params.title);
        createTime.setAttribute("datetime", params.createTimeStamp);



        setPostImage(params.id, params.postImgCount, todoImage, todoImageContainer, "POST");
        setDetailPageMoveEvent(params.id, {
            userInfoContainer: null,
            title: title,
            imageContainer: todoImageContainer
        });


        // // view 생성

        title.innerText = params.title;
        createTime.innerText = convert.convertViewDate(params.createTimeStamp);

        return li;
    }



    // <!-- About -->
    // <section class="blurb">
    //     <h2>About</h2>
    //     <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod
    //         amet placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at phasellus sed ultricies.
    //     </p>
    //     <ul class="actions">
    //         <li><a href="#" class="button">Learn More</a></li>
    //     </ul>
    // </section>

    /**
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



    // <article class="post quote">
    //     <header>
    //         <div class="title">
    //             <h3><a href="single.html">Euismod et accumsan</a></h3>
    //             <p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
    //         </div>
    //         <div class="meta">
    //             <time class="published" datetime="2015-11-01">November 1, 2015</time>
    //             <a href="#" class="author">
    //                 <span class="name">Jane Doe</span>
    //                 <img src="images/avatar.jpg" alt="" />
    //             </a>
    //         </div>
    //     </header>
    //     <div class="col-6 col-12-small" hidden>
    //         <input type="checkbox" id="non-public" name="public" value="public" disabled>
    //         <label for="non-public" style="user-select: none;">비공개</label>
    //     </div>
    //     <footer>
    //         <ul class="stats">
    //             <li class="heart custom-style"><a class="icon solid fa-heart"></a></li>
    //             <li class="update custom-style"><a id="update_button">Update</a></li>
    //             <li class="delete custom-style"><a id="delete_button">Delete</a></li>
    //         </ul>
    //     </footer>
    // </article>

    /**
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
        setPostImage(params.id, params.userImgCount, userImage, username, "USER");


        // 공개 여부 설정
        setVisualPublish({
            id: params.id,
            heart: params.heart,
            isPublish: params.isPublish
        }, heart, null, "QUOTE");

        // view 생성
        quoteId.innerText = params.id;
        quote.innerText = params.quote;
        author.innerText = params.author;
        heart.innerText = params.heart;
        createTime.innerText = convert.convertViewDate(params.createTimestamp);
        username.innerText = params.username;

        return articleContainer;
    }

    // <li>
    //     <input id="files" class="files" type="file" multiple="multiple"></input>
    //     <label for="files" class="button icon solid fa-plus image"></label>
    // </li>						


    createPreViewImageContainer(id) {

        // console.log("postGenerator");
        // console.log(id);

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

    createEmptyMainQuote(params) {
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

        // view 생성
        quoteId.innerText = params.id;
        quote.innerText = params.quote;
        author.innerText = params.author;
        heart.innertText = params.heart;
        createTime.innerText = convert.convertViewDate(params.createTimestamp);
        username.innerText = params.username;

        return articleContainer;
    }

}


var funcServer;
var heartServer;

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

/**
 * 
 * @param {*} id 
 * @param {*} imageCount 
 * @param {*} imageContainer 
 * @param {*} parentImageContainer 
 * @param {*} kind 
 * @returns 
 */

function setPostImage(id, imageCount, imageContainer, parentImageContainer, kind) {

    var imageInfo;

    if (imageCount == null || imageCount == "undefined" || imageCount == 0) {
        return;
    }

    if (kind == "USER" || kind == "user") {
        imageInfo = imageApi.requestUserImage({
            id: id
        });
    }

    if (kind == "POST" || kind == "post") {
        imageInfo = imageApi.requestTodoImageById({
            id: id
        });
    }

    imageInfo.then((data) => {

        const imageData = data[0];
        const imageSource = backEndServerAddress + "/image/api/source" + `/${imageData.fileName}` + `/${imageData.originalFileName}`;
        imageContainer.setAttribute("src", imageSource);
        imageContainer.setAttribute("class", `${kind}-img`);

    });

    parentImageContainer.appendChild(imageContainer);
}

/**
 * 
 * @param {*} id 
 * @param {*} imageCount 
 * @param {*} imageContainers 
 * @returns 
 */

function setTodoDetailImage(id, imageCount, imageContainers) {


    if (imageCount == null && typeof imageCount == "undefined" && imageCount == 0) {
        return;
    }

    var imageInfos = imageApi.requestTodoImageById({
        id: id
    });

    imageInfos.then((data) => {

        for (var i = 0; i < data.length; i++) {
            const imgContainer = document.createElement("span");
            const img = document.createElement("img");
            imgContainer.setAttribute("class", "image featured");
            imgContainer.appendChild(img);
            const imageSource = backEndServerAddress + "/image/api/source" + `/${data[i].fileName}` + `/${data[i].originalFileName}`;
            img.setAttribute("src", imageSource);
            imageContainers.appendChild(imgContainer);
        }
    });



}

function setDetailPageMoveEvent(id, containerList) {

    const postURL = frontEndServerAddress + `/assets/html/tododetails.html?todoid=${id}`;
    const userURL = frontEndServerAddress + "/assets/html/userpage.html";

    if (containerList.userInfoContainer != null) {
        containerList.userInfoContainer.addEventListener("click", function userDetailsPage() {

            window.location.href = userURL;
        });
    }

    if (containerList.title != null) {
        containerList.title.addEventListener("click", function todoDetailsPage() {

            window.localStorage.setItem("todo_id", id);

            window.location.href = postURL;

        });

    }
    if (containerList.imageContainer != null) {
        containerList.imageContainer.addEventListener("click", function todoDetailsPage() {

            window.localStorage.setItem("todo_id", id);

            window.location.href = postURL;

        });
    }
}


function generator(className) {

    if (className == "post" || className == "POST") {

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

        return {
            articleContainer,
            header,
            headerContainer,
            postId,
            titleContainer,
            title,
            subtitle,
            metaContainer,
            createTime,
            userInfoContainer,
            username,
            userImage,
            imageContainer,
            image,
            mainContent,
            footerContainer,
            ulActions,
            ulStats,
            liHeart,
            heart,
            liComment,
            comment
        };
    }

    if (className == "mini-post" || className == "MINI-POST") {

        return;
    }

    if (className == "posts" || className == "POSTS") {

        return;
    }

    if (className = "blurb" || className == "BLURB") {

        return;
    }

    if (className = "single" || className == "SINGLE") {

        return;
    }

    return;
}