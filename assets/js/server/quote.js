/**
 * 유저의 Quote API를 호출하는 파일
 */
export class Quote {

    async requestUserQuoteSave(arg) {
        const url = arg.url;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": arg.userToken
            },
            body: JSON.stringify({
                quote: `${arg.quote}`,
                author: `${arg.author}`,
                isCheckPublic: `${arg.isCheckPublic}`
            }),
        }).then(Response => {

        }).catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
            alert(error);
        });

        return result.json();
    }

    async requestUserQuoteUpdate(arg) {
        const url = arg.url;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": arg.userToken
            },
            body: JSON.stringify({
                quote: `${arg.quote}`,
                author: `${arg.author}`,
                isCheckPublic: `${arg.isCheckPublic}`
            }),
        }).then(Response => {

        }).catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
            alert(error);
        });

        return result.json();
    }

    async requestUserQuoteDelete(arg) {
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

// /quote/manage/save
// /quote/manage/update
// /quote/manage/delete