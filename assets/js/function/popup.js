const $body = document.querySelector("body");

var popup = function () {
    const popupWindow = document.createElement("div");
    popupWindow.setAttribute("class", "popup")

    console.log(popupWindow);
    return popupWindow;
}


$body.appendChild(popup());
