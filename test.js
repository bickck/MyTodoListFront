import {ImagePreviewer} from "./assets/js/util/imgPreviwer.js"

const imagePreviewer = new ImagePreviewer("views","image-count");

imagePreviewer.startImagePreviewerCreator();

const img = document.querySelector(".views");
const button = document.querySelector("#button");

function getTest() {
    const img = imagePreviewer.getImageList();
    console.log(img);
}


button.addEventListener("click", getTest);