//const mainPost = document.querySelector("#main");
/**
 * 유저의 TODO API를 호출하는 파일
 */

import {
    Auth
} from "./../account/auth.js";
const auth = new Auth();


export class Todo {

    async requestUserTodoInsert(arg) {
        const url = backEndServerAddress + "/user/todo/manage/save";
        const data = new FormData();
        const headers = new Headers();

        const todos = JSON.stringify({
            title: `${arg.title}`,
            content: `${arg.content}`,
            isPublish: `${arg.isPublish}`
        });

        for (var i = 0; i < arg.files.length; i++) {
            data.append("files", arg.files[i][0]);
        }

        headers.append("authorization", auth.getJsonToken());
        data.append("todos", todos);


        var result = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: data
        }).then(Response => {
            if (Response.status.toString() === "200") {
                console.log("저장 성공");
                // window.location.href = mainPageAddress;
            }
        }).catch((error) => {
            console.error(error);
        });

        return result.text();
    }

    async requestUserTodoUpdate(arg) {
        const url = backEndServerAddress + "/user/todo/manage" + `/update/${arg.id}`;

        const data = new FormData();
        const headers = new Headers();

        const todos = JSON.stringify({
            title: `${arg.title}`,
            content: `${arg.content}`,
            isPublish: `${arg.isPublish}`
        });

        for (var i = 0; i < arg.files.length; i++) {
            data.append("files", arg.files[i]);
        }

        headers.append("authorization", auth.getJsonToken());
        data.append("todos", todos);

        var result = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: data
        }).then(Response => {
            if (Response.status.toString() === "200") {
                console.log("수정 성공");
            }
        }).catch((error) => {
            console.error(error);
        });

        return result.text();
    }

    async requestUserTodoDelete(arg) {
        const url = backEndServerAddress + "/user/todo/manage" + `/delete/${arg.id}`;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            }
        }).catch((error) => {
            console.error(error);
        });

        return result.text();
    }

    async requestSaveCommentByTodoId(arg) {
        const url = backEndServerAddress + `/user/todo/comment/${arg.id}`;

        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            },
            body: JSON.stringify({
                title: `${arg.title}`,
                cotent: `${arg.content}`,
                isPublish: `${arg.isCheckPublic}`
            }),
        }).catch((error) => {
            console.error(error);
        });

        return result.json();
    }

    async requestSaveHeart(arg) {
        const url = backEndServerAddress + `/heart/todo/${arg.id}`;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            }
        }).catch((error) => {
            console.error(error);
        });

        return result.text();
    }

    async requestCancleHeart(arg) {
        const url = backEndServerAddress + `/heart/cancle/todo/${arg.id}`;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            }
        }).catch((error) => {
            console.error(error);
        });

        return result.json();
    }

    async requestChangePublish(arg) {
        const url = backEndServerAddress + "/user/todo/manage/update/publish" + `/${arg.id}`;

        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            }
        }).catch((error) => {
            console.error(error);
        });

        return result.json();
    }

    async requestHeartExists(arg) {
        const url = backEndServerAddress + `/heart/api/todo/${arg.id}`;

        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            },
        }).catch((error) => {
            console.error(error);
        });

        return result.json();
    }
    
}
