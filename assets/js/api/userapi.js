/**
 *  User API를 호출하는 파일
 */


export class UserApi {


    /**
     * 유저가 작성한 TODO
     */

    async requestUserTodos(arg) {
        const url = backEndServerAddress + "/user/api/todos";


        var result = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `${arg.authorization}`
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

    async requestUserQuotes(arg) {
        const url = backEndServerAddress + "/user/api/quotes";

        var result = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `${arg.authorization}`
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
    async requestUserLikeQuote(arg) {
        const url = backEndServerAddress + "/user/like/quotes";
        var result = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `${arg.authorization}`
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
    async requestUserLikeTodo(arg) {

        const url = backEndServerAddress + "/user/like/todos";
        var result = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `${arg.authorization}`
                },
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }
}
