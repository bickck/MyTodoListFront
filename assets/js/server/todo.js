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
        const url = backEndServerAddress + "/user/todo/post";
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
        }).catch((error) => {
            console.error(error);
        });

        return result.text();
    }

    async requestUserTodoUpdate(arg) {
        const url = backEndServerAddress + `/user/todo/${arg.id}`;

        const data = new FormData();
        const headers = new Headers();

        const todos = JSON.stringify({
            title: `${arg.title}`,
            content: `${arg.content}`,
            isPublish: `${arg.isPublish}`
        });

        // if(arg.files.length == 0) {
        //     console.log("hi");
        //     headers.append("Content-Type","application/json");
        // } else {
        //     for (var i = 0; i < arg.files.length; i++) {
        //         data.append("files", arg.files[i]);
        //     }
        // }

        for (var i = 0; i < arg.files.length; i++) {
            data.append("files", arg.files[i]);
        }


        headers.append("authorization", auth.getJsonToken());
        data.append("todos", todos);

        var result = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: data
        })
        .then((Response)=>{
            auth.setJsonTokenFromResponseHeader(Response);
            return Response;
        })
        .catch((error) => {
            console.error(error);
        });

        return result.text();
    }

    async requestUserTodoDelete(arg) {
        const url = backEndServerAddress + `/user/todo/${arg.id}`;
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
            console.error(error);
        });

        return result.text();
    }

    async requestSaveCommentByTodoId(arg) {
        const url = backEndServerAddress + `/comment/${arg.id}`;

        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            },
            body: JSON.stringify({
                comment : arg.comment
            }),
        })
        .then((Response)=>{
            auth.setJsonTokenFromResponseHeader(Response);
            return Response;
        })
        .catch((error) => {
            console.error(error);
        });

        return result.text();
    }

    async requestSaveHeart(arg) {
        const url = backEndServerAddress + `/heart/todo/${arg.id}`;
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
            console.error(error);
        });

        return result.text();
    }

    async requestCancleHeart(arg) {
        const url = backEndServerAddress + `/heart/todo/${arg.id}`;
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
            console.error(error);
        });

        return result.text();
    }

    async requestChangePublish(arg) {
        const url = backEndServerAddress + "/user/todo/publish" + `/${arg.id}`;

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
        })
        .then((Response)=>{
            auth.setJsonTokenFromResponseHeader(Response);
            return Response;
        })
        .catch((error) => {
            console.error(error);
        });

        return result.json();
    }
    
}
