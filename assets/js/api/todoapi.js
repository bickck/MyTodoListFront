/**
 *  Todo API를 호출하는 파일
 */

// const myHeader = new Headers();

// myHeader.set("origin","*");
// myHeader.append("Content-Type","application/json");

export class TodoApi {

    /**
     * 
     * 가장 많이 추천된 TODO
     */


    async requestMainPosts() {
        const url = backEndServerAddress + "/todo/api/mainpost";
        let response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin" : "*"
                },
            })
            // .then((data)=>{
            //     data.headers.set("Origin","*")
            //     return data;
            // })
            .catch((error) => {
                console.log(error);
            });

        return response.json();
    }

    /**
     * TODO의 디테일을 보기위한 함수
     * @param {*} arg todo id number
     * @returns requestUserTodoByTodoId
     */

    async requestUserTodoByTodoId(arg) {
        const url = backEndServerAddress + `/todo/api/${arg.id}`;
        var result = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((data)=>{

                return data;
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }

    /**
     * 
     * @returns 
     */

    async requestRecommandTodoApi() {

        const url = backEndServerAddress + "/todo/api/recommand";

        var result = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((data)=>{
                
                return data;
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }

    /**
     * 
     * @returns 
     */

    async requestDailyTodoApi() {
        const url = backEndServerAddress + "/todo/api/daily";

        var result = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((data)=>{
                return data;
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }

    async requestTodoCommentsByTodoId(arg) {
        const url = backEndServerAddress + `/todo/api/comment/${arg.id}`;

        var result = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }

    async requestUserTodosByUserName(username) {
        const url = backEndServerAddress + `/todo/api/${username}/todos`;
        var result = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }

    async requestUserLikeTodoByUserName(username) {
        const url = backEndServerAddress + `/todo/api/like/${username}`;
        var result = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }
}
