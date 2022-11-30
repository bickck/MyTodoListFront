var popupOpen = function (message, executeFunction) {

    const $body = document.querySelector("body");
    const $backGround = document.createElement("div");
    const popupWindow = document.createElement("section");
    const messageBox = document.createElement("h2");
    const buttons = document.createElement("div");
    const yesContainer = document.createElement("div");
    const container1 = document.createElement("div");
    const container2 = document.createElement("div");
    const yesButton = document.createElement("a");
    const noButton = document.createElement("a");

    container1.appendChild(yesButton);
    container2.appendChild(noButton);
    yesContainer.appendChild(container1);
    yesContainer.appendChild(container2);
    buttons.appendChild(yesContainer);
    popupWindow.appendChild(messageBox);
    popupWindow.appendChild(buttons);

    $backGround.setAttribute("class", "backGround");
    container1.setAttribute("class", "col-6");
    container2.setAttribute("class", "col-6")
    yesButton.setAttribute("class", "button fit small");
    noButton.setAttribute("class", "button fit small");
    yesContainer.setAttribute("class", "row");
    messageBox.setAttribute("class", "col-12 message");
    buttons.setAttribute("class", "col-12 buttons");
    popupWindow.setAttribute("class", "post popup-window");
    // $body.classList.add("popup");

    yesButton.addEventListener("click", executeFunction);
    noButton.addEventListener("click", popupClose);

    yesButton.innerText = "YES";
    noButton.innerText = "NO";
    messageBox.innerText = message;

    $backGround.appendChild(popupWindow);
    $body.appendChild($backGround);

    return;
}

var popupClose = function () {
    const $body = document.querySelector("body");
    const $backGround = document.querySelector(".backGround");

    $body.removeChild($backGround);
    // $body.classList.remove("popup");
}
