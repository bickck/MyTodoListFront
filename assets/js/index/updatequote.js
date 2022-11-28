import {
    QuoteApi
} from "./../api/quoteapi.js";

const quoteapi = new QuoteApi();
const query = window.location.search;

window.onload = function init() {
    const id = getQueryId(query);
    loadQuoteDetailById(id);
}


function getQueryId(query) {
    const id = new URLSearchParams(query).get("quoteid");
    return id;
}


function loadQuoteDetailById(id) {

    var arg = {
        id: id
    }

    var quoteDetails = quoteapi.requestSearchUserQuoteById(arg);

    quoteDetails.then((data) => {
        console.log(data);
        setQuoteAtForm(data);
    });
}


function setQuoteAtForm(arg) {
    const quote = document.querySelector("#quote");
    const author = document.querySelector("#author");
    const isPublish = document.querySelector("#isPublish");

    console.log(isPublish.checked);

    quote.setAttribute("value", arg.quote);
    author.setAttribute("value", arg.author);

    if (arg.isPublish == "PRIVATE" || arg.isPublish == "private") {
        isPublish.setAttribute("checked", true);
    }
}