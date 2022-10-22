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
        const url = "http://localhost:8080/todo/api/mainpost";
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
     * 
     * @param {*} arg todo id number
     * @returns requestUserTodoByTodoId
     */

    async requestUserTodoByTodoId(arg) {
        //event.preventDefault();
        const url = `http://localhost:8080/todo/api/${id}`;
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

    async requestRecommandTodoApi() {

        const url = "/recommand/todos"
    }

    /**
     * TODO의 디테일을 보기위한 FUNCTION
     * param -
     * id : 게시글 고유 ID
     */

    async requesTodoIdApi() {
        const url = "/recommand/{id}"
    }
}
