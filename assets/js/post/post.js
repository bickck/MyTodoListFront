/**
 * 
 * 포스트에 컨테이너를 생성하고 데이터를 넣는 클래스
 */

export class Post {
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
        let articleContainer = document.createElement("article");
        articleContainer.setAttribute("class", "post");

        /* header */
        let headerContainer = document.createElement("header");

        /* title div */
        let headerTitle = document.createElement("div");
        headerTitle.setAttribute("class", "title");

        let titleContainer = document.createElement("h2");

        let titleLink = document.createElement("a");
        titleLink.setAttribute("href", "");

        let titleWord = document.createElement("p");
        titleWord.innerText = "";

        titleContainer.appendChild(titleLink);
        titleContainer.appendChild(titleWord);

        /* title div */

        /* meta div */
        let metaContainer = document.createElement("div");
        metaContainer.setAttribute("class", "meta");

        let timeContainer = document.createElement("time");
        timeContainer.setAttribute("class", "published");
        timeContainer.setAttribute("datetime", "");

        let userInfoLink = document.createElement("a");
        userInfoLink.setAttribute("class", "autohr");
        let userinfo = document.createElement("span");
        userinfo.setAttribute("class", "name");

        let userImg = document.createElement("img");
        userImg.setAttribute();

        userInfoLink.appendChild(userinfo);
        userInfoLink.appendChild(userImg);

        metaContainer.appendChild(timeContainer);
        metaContainer.appendChild(userInfoLink);
        /* meta div */


        /* header */
        headerContainer.appendChild(headerTitle);
        headerContainer.appendChild(metaContainer);

        /* main area */
        let pageLink = document.createElement("a");
        let mainWord = document.createElement("p");
        /* main area */

        /* footer */
        let footerContainer = document.createElement("footer");

        let ulActions = document.createElement("ul");
        ulActions.setAttribute("class", "actions");

        let ulStats = document.createElement("ul");
        ulStats.setAttribute("class", "stats");

        let liHeart = document.createElement("li");
        let liComment = document.createElement("li");
        ulStats.appendChild(liHeart);
        ulStats.appendChild(liComment);

        footerContainer.appendChild(ulActions);
        footerContainer.appendChild(ulStats);
        /* footer */

        articleContainer.appendChild(headerContainer);
        articleContainer.appendChild(pageLink);
        articleContainer.appendChild(mainWord);
        articleContainer.appendChild(footerContainer);
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

//         <!-- Mini Post -->
//             <article class="mini-post">
//                 <header>
//                     <h3><a href="single.html">Rutrum neque accumsan</a></h3>
//                     <time class="published" datetime="2015-10-19">October 19, 2015</time>
//                     <a href="#" class="author"><img src="images/avatar.jpg" alt="" /></a>
//                 </header>
//                 <a href="single.html" class="image"><img src="images/pic05.jpg" alt="" /></a>
//             </article>

//         <!-- Mini Post -->
//             <article class="mini-post">
//                 <header>
//                     <h3><a href="single.html">Odio congue mattis</a></h3>
//                     <time class="published" datetime="2015-10-18">October 18, 2015</time>
//                     <a href="#" class="author"><img src="images/avatar.jpg" alt="" /></a>
//                 </header>
//                 <a href="single.html" class="image"><img src="images/pic06.jpg" alt="" /></a>
//             </article>

//         <!-- Mini Post -->
//             <article class="mini-post">
//                 <header>
//                     <h3><a href="single.html">Enim nisl veroeros</a></h3>
//                     <time class="published" datetime="2015-10-17">October 17, 2015</time>
//                     <a href="#" class="author"><img src="images/avatar.jpg" alt="" /></a>
//                 </header>
//                 <a href="single.html" class="image"><img src="images/pic07.jpg" alt="" /></a>
//             </article>

//     </div>
// </section>

    setMiniPost(params) {
        let miniArticleContainer = document.createElement("article");
        miniArticleContainer.setAttribute("class","mini-post");

        let miniHeaderContainer = document.createElement("header");
        let miniPostTitle = document.createElement("h3");
        let miniPostLink = document.createElement("a");

        miniPostTitle.appendChild(miniPostLink);
        
        let miniPostDate = document.createElement("time");
        let miniPostAuthorLink = document.createElement("a");
        miniPostAuthorLink.setAttribute("href","");
        miniPostAuthorLink.setAttribute("class","author");

        miniHeaderContainer.appendChild(miniHeaderContainer);
        miniHeaderContainer.appendChild(miniPostDate);
        miniHeaderContainer.appendChild(miniPostAuthorLink);

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
        <li>
            <article>
                <header>
                    <h3><a href="single.html">Convallis maximus nisl mattis nunc id lorem</a></h3>
                    <time class="published" datetime="2015-10-15">October 15, 2015</time>
                </header>
                <a href="single.html" class="image"><img src="images/pic09.jpg" alt="" /></a>
            </article>
        </li>
        <li>
            <article>
                <header>
                    <h3><a href="single.html">Euismod amet placerat vivamus porttitor</a></h3>
                    <time class="published" datetime="2015-10-10">October 10, 2015</time>
                </header>
                <a href="single.html" class="image"><img src="images/pic10.jpg" alt="" /></a>
            </article>
        </li>
        <li>
            <article>
                <header>
                    <h3><a href="single.html">Magna enim accumsan tortor cursus ultricies</a></h3>
                    <time class="published" datetime="2015-10-08">October 8, 2015</time>
                </header>
                <a href="single.html" class="image"><img src="images/pic11.jpg" alt="" /></a>
            </article>
        </li>
        <li>
            <article>
                <header>
                    <h3><a href="single.html">Congue ullam corper lorem ipsum dolor</a></h3>
                    <time class="published" datetime="2015-10-06">October 7, 2015</time>
                </header>
                <a href="single.html" class="image"><img src="images/pic12.jpg" alt="" /></a>
            </article>
        </li>
    </ul>
</section> */
    setPostList(params) {

    }


}