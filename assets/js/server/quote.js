/**
 * 정보를 서버로 보내는 자바스크립트 파일
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
                isPublish: `${arg.isCheckPublic}`
            }),
        }).then(Response => {

            console.log(Response);

        }).catch((error) => {
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
            console.log(error);
        });
        return result.text();
    }
}