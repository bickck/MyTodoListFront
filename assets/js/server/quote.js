/**
 * 정보를 서버로 보내는 자바스크립트 파일
 */
import {
    Auth
} from "./../account/auth.js";
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
        }).catch((error) => {
            console.log(error);
        });

        return result.text();
    }

    async requestUserQuoteDelete(arg) {
        const url = backEndServerAddress + `/user/quote/manage/delete/${arg.id}`;

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

    async requestSaveHeart(arg) {
        const url = backEndServerAddress + `/heart/quote/${arg.id}`;
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

    async requestCancleHeart(arg) {
        const url = backEndServerAddress + `/heart/cancle/quote/${arg.id}`;
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

    async requestChangePublish(arg) {
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

    async requestHeartExists(arg) {
        const url = backEndServerAddress + `/heart/api/quote/${arg.id}`;

        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            }
        }).catch((error) => {
            console.log(error);
        });

        return result.json();
    }
}