import {
    PostGenerator
} from "./../generator/post.js";

import {
    UUID
} from "./../util/uuid.js"

const postgenerator = new PostGenerator();
const uuid = new UUID();

var imageCountContainer;
var currImageCount = 0;
var currImageContainerCount = 0;
const imageSaveLimit = 2;

var viewFileList;
var labelList;
var imageView = document.querySelector(".views");


/**
 * 
 */

function refreshContainer() {
    viewFileList = document.querySelector(".views");
    labelList = document.querySelectorAll(".views > li");
}


/**
 * 
 * @param {*} container 
 */
function setEvents(container) {

    const inputTarget = container.firstChild;

    inputTarget.addEventListener("change", hasImageCount);
    // inputTarget.addEventListener("click", createEmptyImagePreViewer);
    // labelTarget.addEventListener("mouseover", previewMouseOver);
    // labelTarget.addEventListener("mouseout", previewMouseOut);

    container.addEventListener("click", deletePreviewImageContainer);
    container.addEventListener("change", isAvailbleCreatePreviewImageContainer);
    // container.addEventListener("mouseenter", insideMouse);

}

// function insideMouse(event) {

// }

/**
 * 
 * @param {*} event 
 */

function isAvailbleCreatePreviewImageContainer(event) {

    // Next 이벤트 생성
    if (currImageContainerCount < imageSaveLimit && currImageCount != 0) {
        const imageContainer = postgenerator.createPreViewImageContainer(uuid.uuidv4_4());
        imageView.appendChild(imageContainer);
        setEvents(imageContainer);
        viewFileList = document.querySelectorAll(".files");
    }
}

/**
 * 
 * @param {*} event 
 */

function senceParentViewListOnChange(event) {

    var currLabel = event.target.nextElementSibling;
    var currInput = event.target;

    currInput.setAttribute("disabled", true);
    imagePreviewer(currInput, currLabel);
}

/**
 * 
 * @param {*} event 
 */

function hasImageCount(event) {

    var imageCount = 0;
    imageView = document.querySelector(".views");

    for (var i = 0; i < imageView.childElementCount; i++) {
        const imageContainer = imageView.children[i];

        if (imageContainer.firstChild.files.length != 0) {
            imageCount += 1;
        }
    }
    
    currImageCount = imageCount;
    imageCountContainer.innerText = imageCount;
    currImageContainerCount = imageView.childElementCount;
}

/**
 * 
 * @param {*} input 
 * @param {*} label 
 * @returns 
 */

function imagePreviewer(input, label) {

    if (input == null && label == null) {
        return;
    }

    if (input.file || input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {

            label.style.cssText = `
                background-image: url(${e.target.result});
                background-size: cover;
                background-repeat: no-repeat;
            `;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

/**
 * 
 * @param {*} event 
 */

function deletePreviewImageContainer(event) {

    const eventTagName = event.target.tagName;

    // prevent bubbling
    // is input tag?
    if (eventTagName == "LABEL" || eventTagName != "INPUT") {
        // has file in labelTag?
        if (event.target.style.backgroundImage == undefined || event.target.style.backgroundImage == "") {
            return;
        }
    }

    // has file in input?
    if (eventTagName != "LABEL" || eventTagName == "INPUT") {
        if (event.target.attributes.disabled == undefined) {
            return;
        }
    }

    const currentImageContainer = event.target.parentElement;
    imageView.removeChild(currentImageContainer);

    hasImageCount(event);
    isAvailbleCreatePreviewImageContainer(event);
}




function starter(previwerContainer) {
    // uuid 필요
    const imageContainer = postgenerator.createPreViewImageContainer(uuid.uuidv4_4());
    previwerContainer.appendChild(imageContainer);
    setEvents(imageContainer);
    refreshContainer();
    imageView.addEventListener("change", senceParentViewListOnChange);
}

function starterData(requestUrls, previwerContainer) {

    for (var i = 0; i < requestUrls.length; i++) {
        const imageContainer = postgenerator.createPreViewImageContainer(uuid.uuidv4_4());
        previwerContainer.appendChild(imageContainer);
        imageContainer.firstChild.setAttribute("disabled", true);

        setEvents(imageContainer);
        refreshContainer();
        const label = imageContainer.lastChild;

        label.style.cssText = `
                background-image: url(${requestUrls[i]});
                background-size: cover;
                background-repeat: no-repeat;
            `;
        const file =  converUrlToImage(requestUrls[i]);

        file.then((data) => {
            let list = new DataTransfer();
            list.items.add(data);     
            let myFileList = list.files;
            imageContainer.firstChild.files = myFileList;
            hasImageCount();
            isAvailbleCreatePreviewImageContainer();
        });
    }
    
    imageView.addEventListener("change", senceParentViewListOnChange);
}

async function converUrlToImage(url) {
    const fileName = url.split("/").reverse()[0];
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], `${fileName}`,{type : blob.type});

    return file;
}


export class ImagePreviewer {

    previwerContainer;
    imageCountContainer;
    saveImageCountLimit = 2;

    constructor(className, imageCountClassName) {
        this.previwerContainer = document.querySelector(`.${className}`);
        imageCountContainer = document.querySelector(`.${imageCountClassName}`);
    }

    // no exists img
    startImagePreviewerCreator(saveImageCountLimit, imageCountClassName) {
        if (saveImageCountLimit != null || saveImageCountLimit != undefined) {
            this.saveImageCountLimit = saveImageCountLimit
        }
        refreshContainer();
        starter(this.previwerContainer);
    }

    // exists img
    setImagePreview(requestUrls) {
        refreshContainer();

        starterData(requestUrls, this.previwerContainer)
    }

    getImageList() {
        var files = [];
        for (var i = 0; i < imageView.childElementCount; i++) {
            const file = imageView.children[i].firstChild.files;
            if (file.length != 0) {
                files[i] = file[0];
            }
        }
        return files;
    }
}
