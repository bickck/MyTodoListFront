import "./../config.js"
import {
    TodoApi
} from "./../api/todoapi.js";
import {
    QuoteApi
} from "./../api/quoteapi.js";
import {
    PostGenerator
} from "./../generator/post.js";
const postGenerator = new PostGenerator();
const todoapi = new TodoApi();
const quoteapi = new QuoteApi();

var isFirstPage = false;
var isLastPage = false;
var currentPage = 0;
var url;
var requestData;
var result;
var node;
var nextButton;
var prevButton;

function disableButton(button) {
    button.setAttribute("disabled", "");
}

function enableButton(button) {
    button.removeAttribute("disabled");
}

function clearPosts(section) {
    const childrenCount = section.children.length;
    for (var i = childrenCount - 1; i > 0; i--) {
        section.removeChild(section.children[i]);
    }
}

function init(_prevButton, _nextButton, section, firstRequestData) {

    prevButton = _prevButton;
    nextButton = _nextButton;
    isFirstPage = firstRequestData.first;
    isLastPage = firstRequestData.last;
    currentPage = firstRequestData.number;
    requestData = firstRequestData;

    if (isFirstPage) {
        disableButton(prevButton);
    }

    if (isLastPage) {
        disableButton(nextButton);
    }

    changeButtonVisual(firstRequestData);

    prevButton.addEventListener("click", function () {
        setPrevPaginationEvent(currentPage - 1, section);
    });

    nextButton.addEventListener("click", function () {
        setNextPaginationEvent(currentPage + 1, section);
    });
}

function changeButtonVisual(data) {
    isFirstPage = data.first;
    isLastPage = data.last;
    currentPage = data.number;

    if (isFirstPage) {
        disableButton(prevButton);
    } else {
        enableButton(prevButton);
    }

    if (isLastPage) {
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
    }
}

function setVisualDataInSection(data, section) {
    clearPosts(section);
    changeButtonVisual(data);
    const count = data.content.length;

    for (var i = 0; i < count; i++) {
        section.appendChild(node(data.content[i]));
    }
}

function setPrevPaginationEvent(number, section) {
    const requestUrl = url + `?page=${number}`;

    result(requestUrl).then((data) => {
        requestData = data;
        setVisualDataInSection(data, section);
    })
}

function setNextPaginationEvent(number, section) {
    const requestUrl = url + `?page=${number}`;
    result(requestUrl).then((data) => {
        requestData = data;
        setVisualDataInSection(data, section);
    });
}

function paginationMainTodo(prevButton, nextButton, todoSection, firstRequestData) {
    init(prevButton, nextButton, todoSection, firstRequestData);
    url = backEndServerAddress + `/todo/api/mainpost`;
    result = todoapi.requestMainPostsByUrl;
    node = postGenerator.createMainPost;
}

function paginationMainQuote(prevButton, nextButton, quoteSection, firstRequestData) {
    init(prevButton, nextButton, quoteSection, firstRequestData);
    url = backEndServerAddress + `/quote/api/mainquote`;
    result = quoteapi.requestMainPostsByUrl;
    node = postGenerator.createMainQuote;
}

export {
    paginationMainTodo,
    paginationMainQuote
}
