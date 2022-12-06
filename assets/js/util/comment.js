import {
    ConvertDate
} from "./../util/date.js";

const convert = new ConvertDate();

export class Comment {
    createCommentElement(params) {

        var elements = {
            ul: document.createElement("li"),
            article: document.createElement("article"),
            header: document.createElement("header"),
            commentIdContainer: document.createElement("h4"),
            section: document.createElement("section"),
            commentContainer: document.createElement("h4"),
            footer: document.createElement("footer"),
            stateUl: document.createElement("ul"),
            timeLi: document.createElement("li"),
            createTimestamp: document.createElement("time")
        }

        elements.timeLi.appendChild(elements.createTimestamp);
        elements.stateUl.appendChild(elements.timeLi);
        elements.header.appendChild(elements.commentIdContainer);
        elements.section.appendChild(elements.commentContainer);
        elements.footer.appendChild(elements.stateUl);
        elements.article.appendChild(elements.header);
        elements.article.appendChild(elements.section);
        elements.article.appendChild(elements.footer);
        elements.ul.appendChild(elements.article);

        elements.createTimestamp.setAttribute("class", "published");
        elements.commentIdContainer.setAttribute("id", `commentID-${params.id}`);
        elements.section.setAttribute("class", "comment");

        elements.commentIdContainer.innerText = params.id;
        elements.commentContainer.innerText = params.comment;
        elements.createTimestamp.innerText = convert.convertViewDate(params.createTimeStamp);

        return elements.ul;
    }

    createCommentLayer(params, addComment, closeLayer) {

        var elements = {
            commentLayer: document.createElement("article"),
            commnetLayerHeader: document.createElement("div"),
            commentContainer: document.createElement("ul"),
            conmmentTitleContainer: document.createElement("div"),
            commentTitle: document.createElement("h2"),
            commentCloseLayer: document.createElement("div"),
            commentCloseButton: document.createElement("a"),
            commentWriteContainer: document.createElement("div"),
            commentWriteButton: document.createElement("a"),
            commentFormLayer: document.createElement("div")
        }

        var writeElement = createCommentWriter(params, addComment);

        elements.commentWriteButton.innerText = "Write Comment";
        elements.commentWriteButton.setAttribute("class", "button small");
        elements.commentCloseButton.setAttribute("class", "icon solid fa-times comment-close");
        elements.commentLayer.setAttribute("class", "post comment-layer");
        elements.commentCloseLayer.setAttribute("class", "close-layer");
        elements.commnetLayerHeader.setAttribute("class", "comment-layer-header");
        elements.commentContainer.setAttribute("class", "posts comment-contents");

        elements.commentCloseLayer.appendChild(elements.commentCloseButton);
        elements.conmmentTitleContainer.appendChild(elements.commentTitle);
        elements.commentWriteContainer.appendChild(elements.commentWriteButton);
        elements.commnetLayerHeader.appendChild(elements.conmmentTitleContainer);
        // elements.commnetLayerHeader.appendChild(elements.commentWriteContainer);
        elements.commentLayer.appendChild(elements.commentCloseLayer);
        elements.commentLayer.appendChild(elements.commnetLayerHeader);
        elements.commentFormLayer.appendChild(writeElement.commentForm);
        elements.commentLayer.appendChild(elements.commentFormLayer);
        elements.commentLayer.appendChild(elements.commentContainer);

        elements.commentTitle.innerText = "COMMENT";

        elements.commentCloseButton.addEventListener("click", closeLayer);

        return elements;
    }
    removeCommentLayer() {

        const body = document.querySelector("body");
        const layer = document.querySelector(".comment-layer");

        body.removeChild(layer);
    }


}

function createCommentWriter(params, addComment) {

    var elements = {
        commentForm: document.createElement("form"),
        row: document.createElement("div"),
        col_12: document.createElement("div"),
        row_2: document.createElement("div"),
        col_8: document.createElement("div"),
        commnet_input: document.createElement("input"),
        error_message: document.createElement("div"),
        col_4: document.createElement("div"),
        button: document.createElement("button"),
        todo_id: document.createElement("div")
    }

    elements.todo_id.setAttribute("todo_id", `${params.id}`);

    elements.row.setAttribute("class", "row gtr-uniform");
    elements.col_12.setAttribute("class", "col-12");
    elements.row_2.setAttribute("class", "row");
    elements.col_8.setAttribute("class", "col-8");
    elements.col_4.setAttribute("class", "col-4");
    elements.error_message.setAttribute("class", "comment-message message");
    elements.button.setAttribute("class", "button fit medium");
    elements.button.setAttribute("type", "button");

    elements.commentForm.setAttribute("id", "comment_form");
    elements.error_message.setAttribute("id", "comment-message");
    elements.button.setAttribute("id", "comment-save-button");
    elements.todo_id.setAttribute("id", "TodoID");

    elements.commnet_input.setAttribute("id", "comment");
    elements.commnet_input.setAttribute("type", "text");
    elements.commnet_input.setAttribute("name", "comment");
    elements.commnet_input.setAttribute("value", "");
    elements.commnet_input.setAttribute("placeholder", "Comment");
    elements.commnet_input.setAttribute("autocomplete", "off");

    elements.col_8.appendChild(elements.todo_id);
    elements.col_8.appendChild(elements.commnet_input);
    elements.col_8.appendChild(elements.error_message);
    elements.col_4.appendChild(elements.button);
    elements.row_2.appendChild(elements.col_8);
    elements.row_2.appendChild(elements.col_4);
    elements.col_12.appendChild(elements.row_2);
    elements.row.appendChild(elements.col_12);
    elements.commentForm.appendChild(elements.row);

    elements.button.addEventListener("click", addComment);

    elements.button.innerText = "Save Comment";

    return elements;
}
