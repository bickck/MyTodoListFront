/**
 * 
 * 포스트에 컨테이너를 생성하고 데이터를 넣는 클래스
 */
import {ConvertDate} from "../util/date.js";

const convert = new ConvertDate();

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
    // 	</article>

    createMainPost(params) {

        var returnArg = {
            articleContainer,
            userImg,
            postImg
        }
        var articleContainer = document.createElement("article");
        var headerContainer = document.createElement("header");
        var headerTitle = document.createElement("div");
        var titleContainer = document.createElement("h2");
        var titleLink = document.createElement("a");
        var titleWord = document.createElement("p");
        var metaContainer = document.createElement("div");
        var timeContainer = document.createElement("time");
        var userInfoLink = document.createElement("a");
        var userinfo = document.createElement("span");
        var userImg = document.createElement("img");
        var pageLink = document.createElement("a");
        var postImg = document.createElement("img");
        var mainWord = document.createElement("p");
        var footerContainer = document.createElement("footer");
        var ulActions = document.createElement("ul");
        var ulStats = document.createElement("ul");
        var liHeart = document.createElement("li");
        var aHeart = document.createElement("a");
        var liComment = document.createElement("li");
        var aComment = document.createElement("a");

        articleContainer.setAttribute("class", "post");
        headerTitle.setAttribute("class", "title");
        titleLink.setAttribute("href", "#");
        metaContainer.setAttribute("class", "meta");
        timeContainer.setAttribute("class", "published");
        timeContainer.setAttribute("datetime", "2022");
        userInfoLink.setAttribute("href", "#");
        userInfoLink.setAttribute("class", "author");
        userinfo.setAttribute("class", "name");
        userImg.setAttribute("src", "#");
        userImg.setAttribute("alt", "#");
        postImg.setAttribute("src", "#");
        postImg.setAttribute("alt", "#");
        pageLink.setAttribute("href", "#");
        pageLink.setAttribute("class", "image featured");
        ulActions.setAttribute("class", "actions");
        ulStats.setAttribute("class", "stats");
        aHeart.setAttribute("href", "#");
        aHeart.setAttribute("class", "icon solid fa-heart");
        aComment.setAttribute("href", "#");
        aComment.setAttribute("class", "icon solid fa-comment");

        titleContainer.appendChild(titleLink);
        headerTitle.appendChild(titleContainer);
        headerTitle.appendChild(titleWord);
        userInfoLink.appendChild(userinfo);
        // userInfoLink.appendChild(userImg);
        metaContainer.appendChild(timeContainer);
        metaContainer.appendChild(userInfoLink);
        headerContainer.appendChild(headerTitle);
        headerContainer.appendChild(metaContainer);
        // pageLink.appendChild(pageImages);
        liHeart.appendChild(aHeart);
        liComment.appendChild(aComment);
        ulStats.appendChild(liHeart);
        ulStats.appendChild(liComment);
        footerContainer.appendChild(ulActions);
        footerContainer.appendChild(ulStats);
        articleContainer.appendChild(headerContainer);
        articleContainer.appendChild(pageLink);
        articleContainer.appendChild(mainWord);
        articleContainer.appendChild(footerContainer);

        // is check user img generator
        if (params.userImgCount != null && typeof params.userImgCount != "undefined" && params.userImgCount != 0) {
            userInfoLink.appendChild(userImg);

        }
        // is check post img generator
        if (params.postImgCount != null && typeof params.postImgCount != "undefined" && params.postImgCount != 0) {
            pageLink.appendChild(postImg);
        }
        console.log(params);

        titleLink.innerText = params.title;
        titleWord.innerText = params.subtitle;
        timeContainer.innerText = convert.convertViewDate(params.createTimeStamp);
        userinfo.innerText = params.username;
        mainWord.innerText = params.content;
        aHeart.innerText = params.heart;
        aComment.innerText = params.comment;

        returnArg.articleContainer = articleContainer;
        returnArg.postImg = postImg;
        returnArg.userImg = userImg;

        return returnArg;
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

    crateMiniPost(params) {
        var articleContainer = document.createElement("article");
        var headerContainer = document.createElement("header");
        var titleContainer = document.createElement("h3");
        var titleLink = document.createElement("a");
        var time = document.createElement("time");
        var author = document.createElement("a");
        var authorImage = document.createElement("img");
        var postImageContainer = document.createElement("a");
        var postImage = document.createElement("img");

        articleContainer.setAttribute("class", "mini-post");
        titleLink.setAttribute("href", "");
        time.setAttribute("class", "published");
        time.setAttribute("datatime", "");
        author.setAttribute("href", "#");
        author.setAttribute("class", "author");
        authorImage.setAttribute("src", "");
        authorImage.setAttribute("alt", "");
        postImageContainer.setAttribute("href", "#");
        postImageContainer.setAttribute("class", "image");
        postImage.setAttribute("src", "");
        postImage.setAttribute("alt", "");

        if (params.userImgCount != null && typeof params.userImgCount != "undefined" && params.userImgCount != 0) {
            postImageContainer.appendChild(postImage);
        }
        if (params.postImgCount != null && typeof params.postImgCount != "undefined" && params.postImgCount != 0) {
            author.appendChild(authorImage);
        }
        titleLink.innerText = params.title;
        time.innerText = params.date;



        // postImageContainer.appendChild(postImage);
        titleContainer.appendChild(titleLink);
        author.appendChild(authorImage);
        headerContainer.appendChild(titleContainer);
        headerContainer.appendChild(time);
        headerContainer.appendChild(author);
        articleContainer.appendChild(headerContainer);
        // articleContainer.appendChild(postImageContainer);


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
        var li = document.createElement("li");
        var articleContainer = document.createElement("article");
        var header = document.createElement("header");
        var title = document.createElement("h3");
        var titleLink = document.createElement("a");
        var createTime = document.createElement("time");
        var postImageContainer = document.createElement("a");
        var postImage = document.createElement("img");


        titleLink.setAttribute("href", "");
        createTime.setAttribute("class", "published");
        createTime.setAttribute("datetime", "");
        postImageContainer.setAttribute("href", "");
        postImageContainer.setAttribute("class", "image");
        postImage.setAttribute("src", "");
        postImage.setAttribute("alt", "");

        titleLink.innerText = params.title;
        createTime.innerText = params.date;

        if (params.postImgCount != null && typeof params.postImgCount != "undefined" && params.postImgCount != 0) {
            postImageContainer.appendChild(postImage);
        }

        title.appendChild(titleLink);
        header.appendChild(title);
        header.appendChild(createTime);
        articleContainer.appendChild(header);
        articleContainer.appendChild(postImageContainer);
        li.appendChild(articleContainer);

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


    /**
     * 
     * @param {*} params 
     * @returns 
     */

    createPostListQuote(params) {
        var li = document.createElement("li");
        var articleContainer = document.createElement("article");
        var header = document.createElement("header");
        var quoteContainer = document.createElement("h3");
        var quote = document.createElement("a");
        var author = document.createElement("h4");
        var ulContainer = document.createElement("ul");
        var liHeartContainer = document.createElement("li");
        var heart = document.createElement("a");
        var liCreateTimeContainer = document.createElement("li");
        var createTime = document.createElement("time");

        ulContainer.setAttribute("class", "stats");
        heart.setAttribute("href", "#");
        heart.setAttribute("class", "icon solid fa-heart");
        author.setAttribute("id","author");
        quote.setAttribute("id","quote");
        quote.setAttribute("href", "#");
        createTime.setAttribute("class", "published");
        createTime.setAttribute("datetime", "");


        quote.innerText = params.quote;
        author.innerText = `- ${params.author} -`   
        createTime.innerText = convert.convertViewDate(params.createTimestamp);
        heart.innerText = params.heart;

        quoteContainer.appendChild(quote);
        liHeartContainer.appendChild(heart);
        liCreateTimeContainer.appendChild(createTime);

        ulContainer.appendChild(liHeartContainer);
        ulContainer.appendChild(liCreateTimeContainer);
        header.appendChild(quoteContainer);
        header.appendChild(author);
        header.appendChild(ulContainer);

        articleContainer.appendChild(header);
        li.appendChild(articleContainer);

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
        var blurdSection = document.createElement("section");
        var h2 = document.createElement("h2");
        var content = document.createElement("p");
        var ulActions = document.createElement("ul");
        var liAction = document.createElement("li");
        var aAction = document.createElement("a");

        blurdSection.setAttribute("class", "blurb");
        ulActions.setAttribute("class", "actions")
        aAction.setAttribute("href", "");
        aAction.setAttribute("class", "button");

        ulActions.appendChild(liAction);

        blurdSection.appendChild(h2);
        blurdSection.appendChild(content);
        blurdSection.appendChild(ulActions);

        h2.innerText = params.title;
        content.innerText = params.content;

        return blurdSection;
    }

}
