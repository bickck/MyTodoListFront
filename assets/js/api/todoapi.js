/**
 *  Todo API를 호출하는 파일
 */


export class TodoApi {

    /**
     * 
     * 가장 많이 추천된 TODO
     */


    async requestMainPosts() {
        //event.preventDefault();
        const url = backEndServerAddress +"/todo/api/mainpost";
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch((error) => {
            console.log(error);
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return  response.json();
    }

    /**
     * TODO의 디테일을 보기위한 함수
     * @param {*} arg todo id number
     * @returns requestUserTodoByTodoId
     */

    async requestUserTodoByTodoId(arg) {
        //event.preventDefault();
        const url =backEndServerAddress + `/todo/api/${id}`;
        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch((error) => {
            console.log(error);
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }

    /**
     * 
     * @returns 
     */

    async requestRecommandTodoApi() {

        const url = backEndServerAddress +"/todo/api/recommand";

        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }

    /**
     * 
     * @returns 
     */

    async requestDailyTodoApi() {
        const url = backEndServerAddress +"/todo/api/daily";

        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }

    async requestTodoCommentsByTodoId(arg){
        const url = backEndServerAddress +`/todo/api/comment/${arg.id}`;

        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();

    }
}
