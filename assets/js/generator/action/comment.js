var layer;
var main;

function openCommentLayer(event) {

    var targetId = event.target.id.split("-")[2];
    main = document.querySelector("body");

    layer = comment.createCommentLayer({
        id: targetId
    }, addComment, closeCommentLayer);


    var result = todoApi.requestTodoCommentsByTodoId({
        id: targetId
    });

    result.then((data) => {
        if (data == null || data.content.length == 0) {
            var arg = {
                title: "데이터가 없어요."
            }

            var section = comment.createCommentElement(arg);
            layer.commentContainer.appendChild(section);
            main.appendChild(layer.commentLayer);

        } else {

            for (var i = 0; i < data.numberOfElements; i++) {
                var section = comment.createCommentElement(data.content[i]);
                layer.commentContainer.appendChild(section);
            }
            main.appendChild(layer.commentLayer);
        }
    });
}

function reloadTodoCommeandData(todoId) {

    layer = comment.createCommentLayer({
        id: todoId
    }, addComment, closeCommentLayer);

    clearCommentList();

    var result = todoApi.requestTodoCommentsByTodoId({
        id: todoId
    });

    result.then((data) => {
        for (var i = 0; i < data.numberOfElements; i++) {
            var section = comment.createCommentElement(data.content[i]);
            layer.commentContainer.appendChild(section);
        }
        main.appendChild(layer.commentLayer);

    });
}

function addComment(event) {
    const todo_Id = document.querySelector("#TodoID").getAttribute("todo_id");
    const comment = document.getElementById("comment_form").elements[0].value;

    var result = todoServer.requestSaveCommentByTodoId({
        id: todo_Id,
        comment: comment
    });

    result.then((data) => {
        if (data == "SUCCESS") {
            reloadTodoCommeandData(todo_Id);
        }
    })
}


function clearCommentList(todoId) {
    var childSize = layer.commentContainer.childElementCount;

    for (var i = 0; i < childSize; i++) {
        layer.commentContainer.removeChild(layer.commentContainer.childNodes[i]);
    }
}

function closeCommentLayer(event) {
    comment.removeCommentLayer();
}
