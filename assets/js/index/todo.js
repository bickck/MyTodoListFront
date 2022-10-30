/**
 * 
 */

import {
    TodoApi
} from "./../api/todoapi.js";
import {
    NonDataInjector 
} from "./../util/page.js";

const todoapi = new TodoApi();
const nonDataInjector = new NonDataInjector();

const mainTodoContainer = document.querySelector(".main-todo");
const recommandTodoContainer = document.querySelector(".daliy-todos");
const dailyTodoContainer = document.querySelector(".daliy-todos");

window.onload = function init() {

    mainTodoApi();
    dailyTodoApi();
    recommandTodoApi();

}

function mainTodoApi() {
    const mainApiList = todoapi.requestMainPosts();

    mainApiList.then((data) => {
        console.log(mainTodoContainer);

        if (data == null || data == "undefined"|| data.number == 0) {
            console.log(nonDataInjector.createNonMainPost())
            mainTodoContainer.appendChild(nonDataInjector.createNonMainPost());
            return;
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = postGenerator.createMainQuote(content);


            mainTodoContainer.appendChild(container);
        }
    });
}

function recommandTodoApi() {

    const resposeRecommandTodoList = todoapi.requestRecommandTodoApi();

    resposeRecommandTodoList.then((data) => {

        if (data == null || data == "undefined"|| data.number == 0) {
            recommandTodoContainer.appendChild(nonDataInjector.createPostListQuote());
            return;
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = postGenerator.createPostListQuote(content);


            recommandTodoContainer.appendChild(container);
        }
    });

}


function dailyTodoApi() {

    const dailyQuoteList = todoapi.requestDailyTodoApi();

    dailyQuoteList.then((data) => {

        if (data == null || data == "undefined"|| data.number == 0) {
            dailyTodoContainer.appendChild(nonDataInjector.createPostListQuote());

            return;
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = postGenerator.createPostListQuote(content);


            dailyTodoContainer.appendChild(container);
        }
    });

}

