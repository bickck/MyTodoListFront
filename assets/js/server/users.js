/**
 * 유저의 정보 API를 호출하는 파일
 */
import {
    Auth
} from "./../account/auth.js";
const auth = new Auth();

const token = auth.getJsonToken();

export class Users {
    // 유저 정보 요청
    async requestUserDetails() {
        const url = backEndServerAddress + `/user/api/intro`;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`
            },
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

    async requestUserUpdate(arg) {
        const url = backEndServerAddress + `/user/intro`;
        var result = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`
            },
            body: JSON.stringify({
                username : arg.username,
                birth : arg.birth,
                introComment : arg.comment
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

    async requestUserDelete(arg) {
        const url = backEndServerAddress + `/`;
        var result = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`
            },
            body: JSON.stringify({
                id : arg.id
            }),
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

    async requestSaveUserIntro(arg) {
        const url = backEndServerAddress + `/user/intro/comment`;
        var result = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`
            },
            body: JSON.stringify({
                introComment : arg.introComment
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

    async requestUpdateUserIntroImage(arg) {
        const url = backEndServerAddress + `/user/intro/image`;

        const data = new FormData();
        const headers = new Headers();

        data.append("file", arg.file[0]);
        headers.append("authorization", token);

        var result = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body : data
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

    async requestDeleteUserIntroImage(arg) {
        const url = backEndServerAddress + `/user/intro/image`;

        const data = new FormData();
        const headers = new Headers();

        headers.append("authorization", token);

        var result = await fetch(url, {
            method: 'DELETE',
            headers: headers
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

}