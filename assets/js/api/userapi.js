/**
 *  User API를 호출하는 파일
 */

import {
    Auth
} from "./../account/auth.js";
const auth = new Auth();

const token = auth.getJsonToken();


export class UserApi {

    /**
     * 유저가 작성한 TODO
     */

    // 유저 정보 요청
    async requestUserDetails(username) {
        const url = backEndServerAddress + `/api/intro/${username}`;
        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((error) => {
            console.log(error);
        });
        
        return result.json();
    }

    async requestUserTodos() {
        const url = backEndServerAddress + "/user/api/todos";


        var result = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }

    /**
     * 유저가 작성한 QUOTE
     */

    async requestUserQuotes() {
        const url = backEndServerAddress + "/user/api/quotes";

        var result = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }

    /**
     * 유저가 좋아요를 누른 Quote
     */
    async requestUserLikeQuote() {
        const url = backEndServerAddress + "/user/like/quotes";
        var result = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }


    /**
     * 유저가 좋아요를 누른 Todo
     */
    async requestUserLikeTodo() {

        const url = backEndServerAddress + "/user/like/todos";
        var result = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `${token}`
                },
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }
}
