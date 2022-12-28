
function setTodoUrl(id) {
    return frontEndServerAddress + `/assets/html/tododetails.html?todoid=${id}`;
}

function setMoveEvent(link) {
    window.location.href = link;
}

function setUserPageMovementEventByUserName(userId, container) {
    const userURL = frontEndServerAddress + `/assets/html/userpage.html?username=${userId}`;
    container.addEventListener("click", function () {
        setMoveEvent(userURL);
    });
}

function setTodoPageMovementEventByTodoTitle(todoId, container) {
    const todoURL = setTodoUrl(todoId);
    container.addEventListener("click", function () {
        setMoveEvent(todoURL);
    });
}

function setTodoPageMovementEventByTodoImage(todoId, container) {
    const todoURL = setTodoUrl(todoId);
    container.addEventListener("click", function () {
        setMoveEvent(todoURL);
    });
}

export {
    setUserPageMovementEventByUserName,
    setTodoPageMovementEventByTodoImage,
    setTodoPageMovementEventByTodoTitle
}