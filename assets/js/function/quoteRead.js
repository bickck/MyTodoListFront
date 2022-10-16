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
    author.innerText = `- ${arg.author} -`;
    heart.innerText = arg.heart;

    if(arg.heart == "private") {
        heart.innerText = "private";
    }
    
    id.value = arg.id;
    quote.value = arg.quote;
    author.value = arg.author;
    heart.value = arg.heart;
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
        .then(data => {
            data.forEach(element => {
                console.log(element);
                quoteInjector(element);
            });
        }).catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
            alert(error);
        });
}
