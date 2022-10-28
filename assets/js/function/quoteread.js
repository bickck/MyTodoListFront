/**
 *  화면에 보여주기 위한 데이터 삽입
 */

import {QuoteApi} from "./../api/quoteapi.js";
// import {quoteInjector} from "./../injector/quoteinjector.js";
import {PostGenerator} from "../generator/post.js";

const quoteapi = new QuoteApi();
const postGenerator = new PostGenerator();

const mainQuoteContainer = document.querySelector("#main");
const dailyQuoteContinaer = document.querySelector(".post");
const recommandQuoteContainer = document.querySelector(".posts");


window.onload = function init() {

    mainQuoteApi();
    dailyQuoteApi();
    recommandQuoteApi();
    const container = postGenerator.createMainQuote({
        id : "1",
        quote : "test1234",
        author : "1234",
        createTimestamp : "2022-10-05",
        username : "1234gqg",
        heart : "0",
        isPublish : "private"
    });
    mainQuoteContainer.appendChild(container);
}

// function quoteInjector(arg) {
//     const id = document.querySelector("#post_id");
//     const quote = document.querySelector("#quote");
//     const author = document.querySelector("#author");
//     const heart = document.querySelector(".fa-heart");


//     id.innerText = arg.id;
//     quote.innerText = arg.quote;
//     author.innerText = `- ${arg.author} -`;
//     heart.innerText = arg.heart;

//     if(arg.heart == "private") {
//         heart.innerText = "private";
//     }
    
//     id.value = arg.id;
//     quote.value = arg.quote;
//     author.value = arg.author;
//     heart.value = arg.heart;
// }

function mainQuoteApi() {
    const requestUrl = backEndServerAddress + "/quote/api/mainquote";

    const mainApiList = quoteapi.requestMainQuotes();

    mainApiList.then((data)=> {
        console.log(data);
        // if (data == null || data == "undefined") {
        //     mainQuoteContainer.appendChild(nonDataInjector.createPostListQuote());
        //     return;
        // }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = postGenerator.createMainQuote(content);

            
            mainQuoteContainer.appendChild(container);
        }
    });
}
function dailyQuoteApi(){
    const requestUrl = backEndServerAddress + "/daily/quotes";

    const dailyQuoteList = quoteapi.requestDailyQuotes({
        url : requestUrl
    });

    dailyQuoteList.then((data)=> {

    });

}

function recommandQuoteApi(){
    const requestUrl = backEndServerAddress + "/recommand/quotes"

    const recommandQuoteList = quoteapi.requestRecommandQuotes({
        url : requestUrl
    });

    recommandQuoteList.then((data)=> {

    });

}

//     fetch(requestUrl, {
//             method: 'GET',
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         .then(Response => Response.json())
//         .then(data => {
//             data.forEach(element => {
//                 console.log(element);
//                 quoteInjector(element);
//             });
//         }).catch((error) => {
//             console.log("서버 연결에 에러가 발생했습니다.");
//             alert(error);
//         });
// }
