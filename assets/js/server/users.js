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
        const url = backEndServerAddress + `/user/intro`;
        console.log(arg);
        var result = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${auth.getJsonToken()}`
            },
            body: JSON.stringify({
                username : arg.username,
                birth : arg.birth,
                introComment : arg.comment
            }),
        }).catch((error) => {
            console.log(error);
        });

        return result.text();
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

    async requestUpdateUserIntroImage(arg) {
        const url = backEndServerAddress + `/user/intro/image`;

        const data = new FormData();
        const headers = new Headers();

        data.append("file", arg.file[0]);
        headers.append("authorization", auth.getJsonToken());

        var result = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body : data
        }).catch((error) => {
            console.log(error);
        });

        return result.text();
    }

    async requestDeleteUserIntroImage(arg) {
        const url = backEndServerAddress + `/user/intro/image`;

        const data = new FormData();
        const headers = new Headers();

        headers.append("authorization", auth.getJsonToken());

        var result = await fetch(url, {
            method: 'DELETE',
            headers: headers
        }).catch((error) => {
            console.log(error);
        });

        return result.text();
    }

}