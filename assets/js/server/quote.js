/**
 * 유저의 Quote API를 호출하는 파일
*/
import {Auth} from "./../account/auth.js";
const auth = new Auth();

export class Quote {

    async requestUserQuoteSave(arg) {
        const url = backEndServerAddress + `/user/quote/manage/save`;
        
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            },
            body: JSON.stringify({
                quote: `${arg.quote}`,
                author: `${arg.author}`,
                isCheckPublic: `${arg.isCheckPublic}`
            }),
        }).then(Response => {

        }).catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
            console.log(error);
        });

        return result.json();
    }

    async requestUserQuoteUpdate(arg) {
        const url = backEndServerAddress + `/user/quote/manage/update/${arg.id}`;
        
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            },
            body: JSON.stringify({
                quote: `${arg.quote}`,
                author: `${arg.author}`,
                isCheckPublic: `${arg.isCheckPublic}`
            }),
        }).then(Response => {

        }).catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
            console.log(error);
        });

        return result.json();
    }

    async requestUserQuoteDelete(arg) {
        const url = backEndServerAddress + `/user/quote/manage/delete/${arg.id}`;

        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            },
            body: JSON.stringify({

            }),
        }).then(Response => {

        }).catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
            console.log(error);
        });

        return result.text();
    }

    async requestSaveQuoteHeart(arg) {
        const url = backEndServerAddress + `/user/quote/manage/heart/save/${arg.id}`;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            }
        }).catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
            console.log(error);
        });
        return result.text();
    }

    async requestChangeQuotePublish(arg) {
        const url = backEndServerAddress + `/user/quote/manage/heart/update/${arg.id}`;

        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            }
        }).catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
            console.log(error);
        });
        return result.text();
    }
}