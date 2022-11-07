/**
 *  action 을 호출하는 파일
 */

 import {
    TodoApi
} from "./../api/todoapi.js"
import {
    PostGenerator
} from "./../generator/post.js";

// const postGenerator = new PostGenerator();
// const todo = new TodoApi();

const stats = document.querySelector(".stats");
const views = document.querySelector(".views");

export class Action {

    createTodoCommentListContianer(id) {
 
    }

    addTodoHeartAction() {

    }

    addQuoteHeartAction() {

    }

    createImageContainerAction() {
        
    }
    
}





// const paginationPrev = document.querySelector(".pagination li .previous");
// const paginationNext = document.querySelector(".pagination li .next");

// const prev_btn = document.queryCommandIndeterm("#prev");
// const next_btn = document.querySelector("#next");

// window.onload = function() {
//     init();
//     var result = todo.requestMainPosts();
//     console.log(result.then(data =>{
//         console.log(data);
//     }));
// }

// function prevPagination() {
//     console.log("prevPagination")
// }

// function nextPaginatino() {
//     console.log("nextPaginatino")
// }

// function reqeustTodoData() {
//     todo.requestMainPosts();
// }

// function init() {

// }

// paginationPrev.addEventListener("click",prevPagination);
// paginationNext.addEventListener("click",nextPaginatino);
