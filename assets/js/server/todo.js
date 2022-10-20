//const mainPost = document.querySelector("#main");
/**
 * 유저의 TODO API를 호출하는 파일
 */
export class Todo {


    async requestUserTodoInsert(arg) {
        const url = arg.url;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": arg.userToken,
            },
            body: JSON.stringify({
                title: `${arg.title}`,
                cotent: `${arg.content}`,
                isChekcPuhlic: `${arg.isCheckPublic}`
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

        return result.json();
    }

    async requestUserTodoUpdate(arg) {
        const url = arg.url;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": arg.userToken
            },
            body: JSON.stringify({
                title: `${arg.title}`,
                cotent: `${arg.content}`,
                isChekcPuhlic: `${arg.isCheckPublic}`
            }),
        }).then(Response => {

        }).catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
            alert(error);
        });
        
        return result.json();
    }

    async requestUserTodoDelete(arg) {
        const url = arg.url;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": arg.userToken
            },
            body: JSON.stringify({

            }),
        }).then(Response => {

        }).catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
            alert(error);
        });

        return result.json();
    }
}
