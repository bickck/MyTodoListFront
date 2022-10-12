/**
 * 
 * 서버로부터 데이터를 받아와서 게시글을 꾸며주는 파일
 */

//const main = document.createElement("#main");

const title = document.querySelector(".title h2 a");
const subTitle = document.querySelector(".title p");

const time = document.querySelector(".meta time");
const author = document.querySelector(".meta a span");

const contentImage = document.querySelector("article img");
const content = document.querySelector("article p");

const footerStats = document.querySelectorAll("footer ul");
const actions = document.querySelectorAll(".pagination");

const heart = footerStats[0].children[1].children[0];
const comment = footerStats[0].children[2].children[0];

function todoDataInjector(arg) {

    title.innerText = arg.title;
    subTitle.innerText = "";
    time.innerText = arg.createDate;
    author.innerText = arg.user;

    contentImage.src = "/hi";
    content.innerText = arg.content;
    heart.innerText = "42";
    comment.innerText = "255";

    // content.innerText = ""
    // console.dir(title);
    // console.dir(subTitle);
    // console.dir(time);
    // console.dir(author);
    // console.dir(contentImage);
    // console.dir(content);
    // console.dir(footerStats);
    // console.dir(actions);
    // console.dir(heart);
    // console.dir(comment);
    
}

todoDataInjector();

// function todoGenerator(arg) {
//     const article = document.createElement("article");
//     article.setAttribute("calss","post");

//     const headerContainer = document.createElement("header");

//     const divTitleContainerInHeader = document.createElement("div");
//     divTitleContainerInHeader.setAttribute("class", "title");
//     const h2TitleInDiv = document.createElement("h2");
//     const titleLinkInH2 = document.createElement("a");
//     titleLinkInH2.setAttribute("href", "#");
//     const subTitleTag = document.createElement("p");


//     const divMetaContainerInHeader = document.createElement("div");
//     divMetaContainerInHeader.setAttribute("class", "meta");

//     const timeInMeta = document.createElement("time");
//     timeInMeta.setAttribute("class", "published");
//     timeInMeta.setAttribute("datetime", "");

//     const authorLinkInMeta = document.createElement("a");
//     authorLinkInMeta.setAttribute("href", "#");
//     authorLinkInMeta.setAttribute("class", "author");
//     const nameInAuthorLink = document.createElement("span");
//     nameInAuthorLink.setAttribute("class", "name");
//     const authorImage = document.createElement("img");
//     authorImage.setAttribute("src", "");
//     authorImage.setAttribute("alt", "");

//     const mainImageInArticle = document.createElement("span");
//     mainImageInArticle.setAttribute("class", "image featured");
//     const imageINMainImageTag = document.createElement("img");
//     imageINMainImageTag.setAttribute("src", "");
//     imageINMainImageTag.setAttribute("alt", "");

//     const mainContent = document.createElement("p");

//     const footerContainer = document.createElement("footer");
//     const ulStats = document.createElement("ul");
//     ulStats.setAttribute("class", "stats");

//     const liInUlStats1 = document.createElement("li");
//     const aliLink1 = document.createElement("a");
//     aliLink1.setAttribute("href", "#");

//     const liInUlStats2 = document.createElement("li");
//     const aliLink2 = document.createElement("a");
//     aliLink2.setAttribute("href", "#");
//     aliLink2.setAttribute("class", "icon solid fa-heart");

//     const liInUlStats3 = document.createElement("li");
//     const aliLink3 = document.createElement("a");
//     aliLink3.setAttribute("href", "#");
//     aliLink2.setAttribute("class", "icon solid fa-commen");

//     const ulActions = document.createElement("ul");
//     ulActions.setAttribute("class", "action pagination");

//     const liAction1 = document.createElement("li");
//     const aAction1 = document.createElement("button");
//     aAction1.setAttribute("class","");

//     const liAction2 = document.createElement("li");
//     const aAction2 = document.createElement("button")
//     aAction2.setAttribute("class","");

//     // header
//     h2TitleInDiv.appendChild(titleLinkInH2)

//     divTitleContainerInHeader.appendChild(h2TitleInDiv);
//     divTitleContainerInHeader.appendChild(subTitleTag);

//     authorLinkInMeta.appendChild(nameInAuthorLink);
//     authorLinkInMeta.appendChild(authorImage);


//     divMetaContainerInHeader.append(timeInMeta);
//     divMetaContainerInHeader.append(authorLinkInMeta);

//     headerContainer.appendChild(divTitleContainerInHeader);
//     headerContainer.appendChild(divMetaContainerInHeader);
//     // header

//     mainImageInArticle.appendChild(imageINMainImageTag);

//     //footer
//     footerContainer.appendChild(ulStats);
//     // footerContainer.appendChild(ulActions);

//     ulStats.appendChild(liInUlStats1);
//     ulStats.appendChild(liInUlStats2);
//     ulStats.appendChild(liInUlStats3);

//     liInUlStats1.appendChild(aliLink1);
//     liInUlStats2.appendChild(aliLink2);
//     liInUlStats3.appendChild(aliLink3);

//     ulActions.appendChild(liInUlStats1);
//     ulActions.appendChild(liInUlStats2);

//     liAction1.appendChild(aAction1);
//     liAction2.appendChild(aAction2);

//     article.appendChild(headerContainer);
//     article.appendChild(mainContent);
//     article.appendChild(footerContainer);

//     main.appendChild();

// }