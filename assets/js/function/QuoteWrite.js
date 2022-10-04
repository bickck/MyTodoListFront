const save_btn = document.querySelector("#save_button");

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
            "authorization" : auth.getJsonToken(),
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