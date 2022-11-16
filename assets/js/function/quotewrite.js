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
        // $("#author").addClass("SUCCESS");
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

    // if (isPublish.checked == false) {
    //     isPublish.value = "publish";
    // }

    // var result = quoteServer.requestUserQuoteSave({
    //     quote : quote,
    //     author : author,
    //     isPublish : isPublish
    // });

    // result.then((data)=> {
    //     if (data.status.toString() === "200") {
    //         alert("저장 성공");
    //         //window.location.href = mainPageAddress;
    //     }
    // });

}

/**
 * 
 */

function quoteUpdate() {

    const requestUrl = backEndServerAddress + "/user/quote/manage/update";
    const quote = document.querySelector("#quote").value;
    const author = document.querySelector("#author").value;
    var isCheckPublic = document.querySelector("#non-public");

    // var arg = {
    //     url : backEndServerAddress + "/user/quote/manage/update",
    //     quote : document.querySelector("#quote").value,
    //     author : document.querySelector("#author").value,
    //     isCheckPublic : document.querySelector("#non-public").value
    // };

    if (isCheckPublic.checked == false) {
        isCheckPublic.value = "public";
    }


    var result = fetch(requestUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization": auth.getJsonToken(),
        },
        body: JSON.stringify({
            quote: `${quote}`,
            author: `${author}`,
            isCheckPublic: `${isCheckPublic}`
        }),
    }).then(Response => {
        if (Response.status.toString() === "200") {
            alert("저장 성공");
            window.location.href = mainPageAddress;
        }

    }).catch((error) => {
        console.log("서버 연결에 에러가 발생했습니다.");
        console.log(error);
    });
}

/**
 * 
 */

function quoteDelete() {
    const requestUrl = backEndServerAddress + "/user/quote/manage/delete";
    const quote = document.querySelector("#quote").value;
    const author = document.querySelector("#author").value;
    var isCheckPublic = document.querySelector("#non-public").value;

    if (isCheckPublic.checked == false) {
        isCheckPublic.value = "public";
    }

    var result = fetch(requestUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization": auth.getJsonToken(),
        },
        body: JSON.stringify({
            quote: `${quote}`,
            author: `${author}`,
            isCheckPublic: `${isCheckPublic}`
        }),
    }).then(Response => {
        if (Response.status.toString() === "200") {
            alert("저장 성공");
            window.location.href = mainPageAddress;
        }

    }).catch((error) => {
        console.log("서버 연결에 에러가 발생했습니다.");
        console.log(error);
    });
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
