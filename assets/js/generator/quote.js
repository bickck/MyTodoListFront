class QuotePostGenerator {


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

        // is check user img generator
        if (params.userImgCount != null && typeof params.userImgCount != "undefined" && params.userImgCount != 0) {

            const imageInfo = imageApi.requestUserImage(params.id);

            imageInfo.then((data) => {
                const imageSource = backEndServerAddress + `/${data.filePath} + /${data.fileName}`;

                userImage.setAttribute("src", imageSource);
                userImage.setAttribute("alt", "#");
            });

            username.appendChild(userImage);
        }

        // 공개여부 설정

        if (params.isPublish == "private") {
            heart.innerText = "private";
            heart.addEventListener("click", function changePublish() {
                quoteServer.requestChangeQuotePublish({
                    id: params.id
                });

            });
        } else {
            heart.innerText = params.heart;
            heart.addEventListener("click", function addHeart() {
                quoteServer.requestSaveQuoteHeart({
                    id: params.id
                });
            });
        }

        // view 생성

        quoteId.innerText = params.id;
        quote.innerText = params.quote;
        author.innerText = params.author;
        createTime.innerText = convert.convertViewDate(params.createTimestamp);
        username.innerText = params.username;

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
        //quote.setAttribute("value", params.quote);
        author.setAttribute("value", params.author);
        createTime.setAttribute("datetime", params.createTimeStamp);


        // 공개 여부 설정

        if (params.isPublish == "private") {
            heart.innerText = "private";
            heart.addEventListener("click", function changePublish() {
                quoteServer.requestChangeQuotePublish({
                    id: params.id
                });

            });
        } else {
            heart.innerText = params.heart;
            heart.addEventListener("click", function addHeart() {
                quoteServer.requestSaveQuoteHeart({
                    id: params.id
                });
            });
        }

        // view 생성

        quoteContainer.innerText = params.quote;
        author.innerText = ` ${params.author} `
        createTime.innerText = convert.convertViewDate(params.createTimestamp);
        heart.innerText = params.heart;

        return li;
    }


}


const CreateQuotePostGenerator = (arg) => {

    const quote = "";
    const author = "";
    const username = "";
    const createTimeStamp = "";
    const heart = 0;

    return (
        <article className="post quote">
            <header>
                <div className="title">
                    <p id="QUOTE_ID-undefined" value="" hidden/>
                    <h3 id="quote" value={quote}>{quote}</h3>
                    <p id="author" value={author}>{author}</p>
                </div>
                <div className="meta">
                    <time className="published" datetime="undefined">{createTimeStamp}</time>
                    <a className="author" href="#user">
                        <span className="username" value={username}>{username}</span>
                        <UserImageGenerator/>
                    </a>
                </div>
            </header>
            <footer>
                <ul className="stats">
                    <li><a className="icon solid fa-heart heart" value={heart}>{heart}</a></li>
                </ul>
            </footer>
        </article>
    );
}

const CreateQuoteListGenerator = (arg) => {

    const quote = "";
    const author = "";
    const createTimeStamp = "";
    const heart = 0;

    return (
        <li>
            <article>
                <header>
                    <h3 value="">{quote}</h3>
                    <p value="">{author}</p>
                        <ul className="stats">
                            <li><a className="icon solid fa-heart">{heart}</a></li>
                            <li><time className="published" datetime="">{createTimeStamp}</time></li>
                        </ul>
                </header>
            </article>
        </li>
    );
}