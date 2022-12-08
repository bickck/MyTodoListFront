/**
 * 유저의 정보 API를 호출하는 파일
 */
import {
    Auth
} from "./../account/auth.js";
const auth = new Auth();

export class Users {
    // 유저 정보 요청
    async requestUserDetails(arg) {
        const url = backEndServerAddress + `/user/api/intro`;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${auth.getJsonToken()}`
            },
        }).catch((error) => {
            console.log(error);
        });
        
        return result.json();
    }

    async requestUserUpdate(arg) {
        const url = backEndServerAddress + `/user/manage/update/intro`;
        var result = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${auth.getJsonToken()}`
            },
            body: JSON.stringify({

            }),
        }).catch((error) => {
            console.log(error);
        });

        return result.json();
    }

    async requestUserDelete(arg) {
        const url = backEndServerAddress + `/`;
        var result = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${auth.getJsonToken()}`
            },
            body: JSON.stringify({
                id : arg.id
            }),
        }).catch((error) => {
            console.log(error);
        });

        return result.json();
    }

    async requestSaveUserIntro(arg) {
        const url = backEndServerAddress + `/user/intro/comment`;
        console.log(arg);
        var result = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${auth.getJsonToken()}`
            },
            body: JSON.stringify({
                introComment : arg.introComment
            }),
        }).catch((error) => {
            console.log(error);
        });

        return result.text();
    }
}