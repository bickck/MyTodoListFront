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



export class TodoInjector {

    todoDataInjector(arg,section) {

        title.innerText = arg.title;
        subTitle.innerText = "";
        time.innerText = arg.createDate;
        author.innerText = arg.user;
    
        contentImage.src = "/hi";
        content.innerText = arg.content;
        heart.innerText = arg.heart;
        comment.innerText = arg.comment;
    
       
    }
}

function todoDataInjector(arg,section) {

    title.innerText = arg.title;
    subTitle.innerText = "";
    time.innerText = arg.createDate;
    author.innerText = arg.user;

    contentImage.src = "/hi";
    content.innerText = arg.content;
    heart.innerText = arg.heart;
    comment.innerText = arg.comment;

   
}

todoDataInjector();

