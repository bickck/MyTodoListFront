import {
    ImageApi
} from "./../../api/imageapi.js";
import {
    setUserProfileImageUrl
} from "./../../generator/functions.js";

const imageApi = new ImageApi();

/**
 * 
 * @param {*} id 
 * @param {*} imageCount 
 * @param {*} imageContainer 
 * @param {*} parentImageContainer 
 * @param {*} kind 
 * @returns 
 */
function setUserIntroImage(imageUUID, imageContainer, parentImageContainer) {

    if (imageUUID == null || imageUUID == "") {
        return;
    } else {

    }

    var imageInfo = imageApi.requestUserImage({
        uuid: imageUUID
    });
    imageInfo.then((data) => {
        const imageSource = setUserProfileImageUrl(data.fileName, data.originalFileName);
        imageContainer.setAttribute("src", imageSource);
        imageContainer.setAttribute("class", `USER-img`);
        imageContainer.setAttribute("style", "width:44.8px, height:44.8px");

    });

    parentImageContainer.appendChild(imageContainer);
}

/**
 * 
 * @param {*} id 
 * @param {*} imageCount 
 * @param {*} imageContainers 
 * @returns 
 */

function setMainTodoImage(id, imageCount, parentImageContainer) {

    if (imageCount == null || typeof imageCount == "undefined" || imageCount == 0) {
        return;
    }

    var imageInfos = imageApi.requestTodoImageById({
        id: id
    });

    imageInfos.then((data) => {
        const imageSource = backEndServerAddress + "/image/api/source" + `/${data[0].fileName}` + `/${data[0].originalFileName}`;
        const imgContainer = document.createElement("span");
        const img = document.createElement("img");

        imgContainer.setAttribute("class", "image featured");
        imgContainer.appendChild(img);
        img.setAttribute("src", imageSource);
        parentImageContainer.appendChild(imgContainer);

    });
}

/**
 * 
 * @param {*} id 
 * @param {*} imageCount 
 * @param {*} imageContainers 
 * @returns 
 */

function setMainTodoImages(id, imageCount, imageContainers) {


    if (imageCount == null || typeof imageCount == "undefined" || imageCount == 0) {
        return;
    }

    var imageInfos = imageApi.requestTodoImageById({
        id: id
    });

    imageInfos.then((data) => {

        for (var i = 0; i < data.length; i++) {
            const imageSource = backEndServerAddress + "/image/api/source" + `/${data[i].fileName}` + `/${data[i].originalFileName}`;
            const imgContainer = document.createElement("span");
            const img = document.createElement("img");
            imgContainer.setAttribute("class", "image featured");
            imgContainer.appendChild(img);
            img.setAttribute("src", imageSource);
            imageContainers.appendChild(imgContainer);
        }
    });
}

/**
 * 
 * @param {*} id 
 * @param {*} imageCount 
 * @param {*} imageContainers 
 * @returns 
 */

function setTodoListImage(id, imageCount, imageContainers) {


    if (imageCount == null || typeof imageCount == "undefined" || imageCount == 0) {
        return;
    }

    var imageInfos = imageApi.requestTodoImageById({
        id: id
    });

    imageInfos.then((data) => {

        const imageSource = backEndServerAddress + "/image/api/source" + `/${data[0].fileName}` + `/${data[0].originalFileName}`;
        const imgContainer = document.createElement("span");
        const img = document.createElement("img");

        imgContainer.setAttribute("class", "image featured");
        imgContainer.appendChild(img);

        img.setAttribute("src", imageSource);
        img.style.height = "64px";
        imageContainers.appendChild(imgContainer);
    });
}

export {
    setUserIntroImage,
    setMainTodoImage,
    setMainTodoImages,
    setTodoListImage
}