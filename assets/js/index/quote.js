/**
 *  화면에 보여주기 위한 데이터 삽입
 */

 import {QuoteApi} from "./../api/quoteapi.js";
 import {PostGenerator} from "./../generator/post.js";
 import { NonDataInjector } from "./../util/page.js";
 
 const nonDataInjector = new NonDataInjector();
 
 
 const quoteapi = new QuoteApi();
 const postGenerator = new PostGenerator();
 
 const mainQuoteContainer = document.querySelector("#main");
 const dailyQuoteContinaer = document.querySelector(".quote-daily");
 const recommandQuoteContainer = document.querySelector(".quote-recommand");
 
 
 window.onload = function init() {
 
     mainQuoteApi();
     dailyQuoteApi();
     recommandQuoteApi();
 }
 
 function mainQuoteApi() {
     const mainApiList = quoteapi.requestMainQuotes();
 
     mainApiList.then((data)=> {
         console.log(data);
         if (data == null || data == "undefined") {
             mainQuoteContainer.appendChild(nonDataInjector.createPostListQuote());
             return;
         }
 
         for (var i = 0; i < data.numberOfElements; i++) {
 
             var content = data.content[i];
             var container = postGenerator.createMainQuote(content);
 
             
             mainQuoteContainer.appendChild(container);
         }
     });
 }
 function dailyQuoteApi(){
 
     const dailyQuoteList = quoteapi.requestDailyQuotes();
 
     dailyQuoteList.then((data)=> {
 
         if (data == null || data == "undefined") {
             dailyQuoteContinaer.appendChild(nonDataInjector.createPostListQuote());
             return;
         }
 
         for (var i = 0; i < data.numberOfElements; i++) {
 
             var content = data.content[i];
             var container = postGenerator.createPostListQuote(content);
 
             
             dailyQuoteContinaer.appendChild(container);
         }
     });
 
 }
 
 function recommandQuoteApi(){
 
     const recommandQuoteList = quoteapi.requestRecommandQuotes();
 
     recommandQuoteList.then((data)=> {
         
         if (data == null || data == "undefined") {
             recommandQuoteContainer.appendChild(nonDataInjector.createPostListQuote());
             return;
         }
 
         for (var i = 0; i < data.numberOfElements; i++) {
 
             var content = data.content[i];
             var container = postGenerator.createPostListQuote(content);
 
             
             recommandQuoteContainer.appendChild(container);
         }
     });
 
 }
 