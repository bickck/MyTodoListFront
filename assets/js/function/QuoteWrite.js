const save_btn = document.querySelector("#update_button");

window.onload = function init() {

    mainQuoteApi();
}
function quoteInjector(arg) {
    const id = document.querySelector("#post_id");
    const quote = document.querySelector("#quote");
    const author = document.querySelector("#author");
    const heart = document.querySelector(".fa-heart");

    id.innerText = arg.id;
    quote.innerText = arg.quote;
    author.innerText =  `- ${arg.author} -`;
    heart.innerText = arg.heart;

    id.value = arg.id;
    quote.value = arg.quote;
    author.value = arg.author;
    heart.value = arg.heart;

    console.dir(id);
    console.dir(quote);
    console.dir(heart);

}
function mainQuoteApi() {
    const requestUrl = backEndServerAddress + "/quote/api/mainQuote";

    fetch(requestUrl, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(Response => Response.json())
    .then(data=>{
        data.forEach(element => {
            console.log(element);
            quoteInjector(element);
        });
    }).catch((error) => {
        console.log("서버 연결에 에러가 발생했습니다.");
        alert(error);
    });
}

function quoteSave() {
    const requestUrl = backEndServerAddress + "/user/quote/manage/save";
    const quote = document.querySelector("#quote").value;
    const author = document.querySelector("#author").value;
    var isCheckPublic = document.querySelector("#non-public");

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
        alert(error);
    });
}

function quoteUpdate() {
    const requestUrl = backEndServerAddress + "/user/quote/manage/save";
    const quote = document.querySelector("#quote").value;
    const author = document.querySelector("#author").value;
    var isCheckPublic = document.querySelector("#non-public");

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
        alert(error);
    });
}

function quoteDelete() {
    const requestUrl = backEndServerAddress + "/user/quote/manage/save";
    const quote = document.querySelector("#quote").value;
    const author = document.querySelector("#author").value;
    var isCheckPublic = document.querySelector("#non-public");

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
        alert(error);
    });
}

save_btn.addEventListener("click", quoteSave);