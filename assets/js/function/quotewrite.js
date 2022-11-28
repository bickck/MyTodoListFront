/**
 * 
 */

import {
    Quote
} from "./../server/quote.js";
import {
    FormValidation
} from "./../validation/formvalidation.js"

const quoteServer = new Quote();
const formvalidation = new FormValidation();

const save_btn = document.querySelector("#save_button");
const update_btn = document.querySelector("#update_button");
const delete_btn = document.querySelector("#delete_button");

$("#quote").on("blur", function (event) {
    var text = event.target.value;

    if (!formvalidation.isTextValidationCheck(text)) {
        return;
    }

    if($("#quote").hasClass("FAILURE")) {
        $("#quote").removeClass("FAILURE");
    }
    
    if(!formvalidation.isTextValidationCheck(text)) {
        $("#register_form").appearErrorMessage("quote-message");
        $("#register_form").setErrorMessage(`quote-message`, "내용을 입력해주세요.");
        $("#quote").addClass("FAILURE");
    } else {
        $("#quote_form").disappearErrorMessage("quote-message");
        // $("#quote").addClass("SUCCESS");
    }
})

$("#author").on("blur", function (event) {
    var text = event.target.value;

    if (!formvalidation.isTextValidationCheck(text)) {
        return;
    }

    if($("#author").hasClass("FAILURE")) {
        $("#author").removeClass("FAILURE");
    }

    if(!formvalidation.isTextValidationCheck(text)) {
        $("#register_form").appearErrorMessage("author-message");
        $("#register_form").setErrorMessage(`author-message`, "내용을 입력해주세요.");
        $("#author").addClass("FAILURE");
    } else {
        $("#quote_form").disappearErrorMessage("author-message");
    }
})

/**
 * 
 * @returns 
 */

function quoteSave() {

    const quote = document.querySelector("#quote").value;
    const author = document.querySelector("#author").value;
    var isPublish = document.querySelector("#isPublish").value;

    var validResult = formvalidation.isQuoteFormCheck("quote_form");
    var validPassed;


    validResult.forEach((data) => {
        if (data.returnCode) {
            validPassed = data.returnCode;
        } else {
            $("quote_form").appearErrorMessage(`${data.id}-message`);
            $("quote_form").setErrorMessage(`${data.id}-message`, data.message);
            $("#quote").addClass("FAILURE");
            $("#author").addClass("FAILURE");
            validPassed = data.returnCode;
        }
    })

    if (!validPassed) {
        return;
    }

    if (isPublish.checked == false) {
        isPublish.value = "publish";
    }

    var result = quoteServer.requestUserQuoteSave({
        quote : quote,
        author : author,
        isPublish : isPublish
    });

    result.then((data)=> {
        if (data.status.toString() === "200") {
            //window.location.href = mainPageAddress;
        }
    });

}

/**
 * 
 */

function quoteUpdate(arg) {

    const quote = document.querySelector("#quote");
    const author = document.querySelector("#author");
    const isPublish = document.querySelector("#isPublish");

    if(isPublish.checked) {
        isPublish.value = "PRIVATE";
    }
    
    console.log(quote.value);
    console.log(author.value);
    console.log(isPublish.value);
    
    // var result = quoteServer.requestUserQuoteUpdate({
    //     quote : quote,
    //     author : author,
    //     isPublish : isPublish
    // });

    // result.then((Response) => {
    //     if (Response.status.toString() === "200") {
    //         //window.location.href = mainPageAddress;
    //     }
    // })
}

/**
 * 
 */

function quoteDelete(arg) {
    const quote = document.querySelector("#quote").value;
    const author = document.querySelector("#author").value;
    var isCheckPublic = document.querySelector("#non-public").value;

    if (isCheckPublic.checked == false) {
        isCheckPublic.value = "public";
    }


    var result = quoteServer.requestUserQuoteUpdate({
        quote : quote,
        author : author,
        isPublish : isPublish
    });

    result.then((Response) => {
        if (Response.status.toString() === "200") {
            //window.location.href = mainPageAddress;
        }
    })
}


if (delete_btn != null) {
    delete_btn.addEventListener("click", quoteDelete);
}
if (update_btn != null) {
    update_btn.addEventListener("click", quoteUpdate);
}
if (save_btn != null) {
    save_btn.addEventListener("click", quoteSave);
}
