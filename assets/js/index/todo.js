/**
 * 
 */

import {
    TodoApi
} from "./../api/todoapi.js";
import {
    NonDataInjector 
} from "./../util/page.js";

import {
    PostGenerator
} from "./../generator/post.js"

const todoapi = new TodoApi();
const nonDataInjector = new NonDataInjector();
const postGenerator = new PostGenerator();

const mainTodoContainer = document.querySelector(".main-todo");
const recommandTodoContainer = document.querySelector(".recommand-todos");
const dailyTodoContainer = document.querySelector(".daliy-todos");

window.onload = function init() {

    mainTodoApi();
    dailyTodoApi();
    recommandTodoApi();

}

function mainTodoApi() {
    const mainApiList = todoapi.requestMainPosts();

    mainApiList.then((data) => {

        console.log(data);
        if (data == null && data == "undefined" && data.totalElements > 0) {
            mainTodoContainer.appendChild(nonDataInjector.createNonMainPost());
            return;
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = postGenerator.createMainPost(content);


            mainTodoContainer.appendChild(container);
        }
    });
}

/**
 * <div class="mini-posts recommand-todos">
 * 
 */

function recommandTodoApi() {

    const resposeRecommandTodoList = todoapi.requestRecommandTodoApi();

    resposeRecommandTodoList.then((data) => {

        if (data == null && data == "undefined" && data.number == 0) {
            recommandTodoContainer.appendChild(nonDataInjector.createNonMiniPost());
            return;
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = postGenerator.createMiniTodos(content);


            recommandTodoContainer.appendChild(container);
        }
    });

}
/**
 * <ul class="posts daliy-todos">
 * 
 */

function dailyTodoApi() {

    const dailyQuoteList = todoapi.requestDailyTodoApi();

    dailyQuoteList.then((data) => {

        if (data == null && data == "undefined" && data.number == 0) {
            dailyTodoContainer.appendChild(nonDataInjector.createTodoList());

            return;
        }

        for (var i = 0; i < data.numberOfElements; i++) {

            var content = data.content[i];
            var container = postGenerator.createTodoList(content);


            dailyTodoContainer.appendChild(container);
        }
    });

}
