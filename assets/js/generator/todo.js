export class TodoGenerator {
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

        comment.addEventListener("click", openCommentLayer);


        // view 값 설정
        title.innerText = params.title;
        subtitle.innerText = "";
        createTime.innerText = convert.convertViewDate(params.createTimeStamp);
        username.innerText = params.username;
        mainContent.innerText = params.content;

        return articleContainer;
    }

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

 function setPostImage(id, imageCount, imageContainer, parentImageContainer) {

    var imageInfo;

    if (imageCount == null || imageCount == "undefined" || imageCount == 0) {
        return;
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
 * @param {*} imageContainer 
 * @param {*} parentImageContainer 
 * @param {*} kind 
 * @returns 
 */

 function setUserImage(id, imageCount, imageContainer, parentImageContainer) {

    var imageInfo;

    if (imageCount == null || imageCount == "undefined" || imageCount == 0) {
        return;
    }

    if (kind == "USER" || kind == "user") {
        imageInfo = imageApi.requestUserImage({
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