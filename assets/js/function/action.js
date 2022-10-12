const stats = document.querySelector(".stats");



async function comment() {

    const requestUrl = "";
    fetch(requestUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization" : auth.getJsonToken(),
        },
        body: JSON.stringify({
            title: `${title}`,
            cotent: `${content}`,
            isChekcPuhlic: `${isCheckPublic}`
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

async function heart() {

    const requestUrl = "/user/todo/manage/heart/add/{id}";
    fetch(requestUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization" : auth.getJsonToken(),
        },
        body: JSON.stringify({
            id : "",
            user : ""
        }),
    }).then(Response => {
        if (Response.status.toString() === "200") {
            alert("저장 성공");
        }

    }).catch((error) => {
        console.log("서버 연결에 에러가 발생했습니다.");
        alert(error);
    });
}
