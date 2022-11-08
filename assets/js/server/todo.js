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
                //window.location.href = mainPageAddress;
            }
        }).catch((error) => {
            console.log(error);
        });

        return result.json();
    }

    async requestUserTodoUpdate(arg) {
        const url = backEndServerAddress + "/user/todo/manage" + `/update/${arg.id}`;

        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            },
            body: JSON.stringify({
                title: `${arg.title}`,
                cotent: `${arg.content}`,
                isChekcPuhlic: `${arg.isCheckPublic}`
            }),
        }).then(Response => {

        }).catch((error) => {
            console.log(error);
        });

        return result.json();
    }

    async requestUserTodoDelete(arg) {
        const url = backEndServerAddress + "/user/todo/manage" + `/delete/${arg.id}`;
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

        return result.json();
    }

    async requestSaveTodoHeart(arg) {
        const url = backEndServerAddress + "/user/todo/manage" + `/heart/add/${arg.id}`;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            },
            body: JSON.stringify({
                title: `${arg.title}`,
                cotent: `${arg.content}`,
                isChekcPuhlic: `${arg.isCheckPublic}`
            }),
        }).catch((error) => {
            console.log(error);
        });
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
                isChekcPuhlic: `${arg.isCheckPublic}`
            }),
        }).catch((error) => {
            console.log(error);
        });
    }

    async requestChangePublish(arg) {
        const url = backEndServerAddress + "/user/todo/manage" + ``;

        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            },
            body: JSON.stringify({
                title: `${arg.title}`,
                cotent: `${arg.content}`,
                isChekcPuhlic: `${arg.isCheckPublic}`
            }),
        }).catch((error) => {
            console.log(error);
        });
    }
}
