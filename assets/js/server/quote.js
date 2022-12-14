/**
 * 정보를 서버로 보내는 자바스크립트 파일
 */
import {
    Auth
} from "./../account/auth.js";
const auth = new Auth();
const token = auth.getJsonToken();

export class Quote {

    async requestUserQuoteSave(arg) {
        const url = backEndServerAddress + `/user/quote`;

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
        })
        .then((Response)=>{   
            console.log(Response); 
            auth.setJsonTokenFromResponseHeader(Response);
            return Response;
        })
        .catch((error) => {
            console.log(error);
        });

        return result.text();
    }

    async requestUserQuoteUpdate(arg) {
        const url = backEndServerAddress + `/user/quote/${arg.id}`;

        var result = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            },
            body: JSON.stringify({
                quote: `${arg.quote}`,
                author: `${arg.author}`,
                isCheckPublic: `${arg.isCheckPublic}`
            }),
        })
        .then((Response)=>{    
            auth.setJsonTokenFromResponseHeader(Response);
            return Response;
        })
        .catch((error) => {
            console.log(error);
        });

        return result.text();
    }

    async requestUserQuoteDelete(arg) {
        const url = backEndServerAddress + `/user/quote/${arg.id}`;

        var result = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            }
        })
        .then((Response)=>{    
            auth.setJsonTokenFromResponseHeader(Response);
            return Response;
        })
        .catch((error) => {
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
        })
        .then((Response)=>{    
            auth.setJsonTokenFromResponseHeader(Response);
            return Response;
        })
        .catch((error) => {
            console.log(error);
        });
        return result.text();
    }

    async requestCancleHeart(arg) {
        const url = backEndServerAddress + `/heart/cancle/quote/${arg.id}`;
        var result = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            }
        })
        .then((Response)=>{    
            auth.setJsonTokenFromResponseHeader(Response);
            return Response;
        })
        .catch((error) => {
            console.log(error);
        });

        return result.text();
    }

    async requestChangePublish(arg) {
        const url = backEndServerAddress + `/user/quote/manage/heart/${arg.id}`;

        var result = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            }
        })
        .then((Response)=>{    
            auth.setJsonTokenFromResponseHeader(Response);
            return Response;
        })
        .catch((error) => {
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
        })
        .then((Response)=>{    
            auth.setJsonTokenFromResponseHeader(Response);
            return Response;
        })
        .catch((error) => {
            console.log(error);
        });

        return result.json();
    }
}