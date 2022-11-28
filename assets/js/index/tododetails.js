import { TodoApi } from "./../api/todoapi.js";
import {PostGenerator} from "./../generator/post.js"

const todoapi = new TodoApi();
const postgenerator = new PostGenerator();

const detailContainer = document.querySelector("#main");

var query = window.location.search;

window.onload = function init() {
    const id = getQueryId(query);
    loadTodoDetailsById(id);
}

function getQueryId(query){
    const id = new URLSearchParams(query).get("todoid");
    return id;
}

function loadTodoDetailsById(id) {

    var arg = {
        id : id
    }

    var todoDetails = todoapi.requestUserTodoByTodoId(arg);

    todoDetails.then((data)=>{
        console.log(data);


        const post = postgenerator.createTodoSinglePage(data);
        
        detailContainer.appendChild(post);
    });
}