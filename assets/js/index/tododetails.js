import { TodoApi } from "./../api/todoapi";

const todoapi = new TodoApi();

window.onload = function init() {
    loadTodoDetailsById();

}


function loadTodoDetailsById() {

    var arg = {
        id : window.localStorage.getItem("todo_id")
    }

    var todoDetails = todoapi.requestUserTodoByTodoId(arg);

    todoDetails.then((data)=>{
        
    });
}