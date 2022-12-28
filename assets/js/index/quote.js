import "./../generator/functions.js";
import "./../generator/header.js";
import "./../generator/footer.js";
import "./../generator/menu.js";
import {QuoteApi} from "./../api/quoteapi.js";
import {PostGenerator} from "./../generator/post.js";
import {NonDataInjector} from "./../util/page.js";

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

    mainApiList.then((data) => {
        console.log(data);

        if (data == null || data == "undefined" || data.empty == true) {
            mainQuoteContainer.appendChild(nonDataInjector.createEmptyMainQuotePost());
            return;
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = postGenerator.createMainQuote(content);
            mainQuoteContainer.appendChild(container);
        }
    });
}

function dailyQuoteApi() {

    const dailyQuoteList = quoteapi.requestDailyQuotes();

    dailyQuoteList.then((data) => {

        if (data == null || data == "undefined" || data.empty == true) {
            dailyQuoteContinaer.appendChild(nonDataInjector.createEmptyQuoteList());
            return;
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = postGenerator.createQuoteList(content);
            dailyQuoteContinaer.appendChild(container);
        }
    });

}

function recommandQuoteApi() {

    const recommandQuoteList = quoteapi.requestRecommandQuotes();

    recommandQuoteList.then((data) => {

        if (data == null || data == "undefined" || data.empty == true) {
            recommandQuoteContainer.appendChild(nonDataInjector.createEmptyQuoteList());
            return;
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = postGenerator.createQuoteList(content);


            recommandQuoteContainer.appendChild(container);
        }
    });

}