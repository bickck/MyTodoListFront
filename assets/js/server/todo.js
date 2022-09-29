const mainPost = document.querySelector("#main");
/**
 * 유저의 TODO API를 호출하는 클래스
 */
export class Todo { 

    //메인 데이터 요청
    requestMainPosts(event) {
        //event.preventDefault();
        const url = "http://localhost:8080/todo/api/todoData";
        var result = fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

            }),
        }).then(Response => {
            data(Response);

        }).catch((error) => {

            alert("서버 연결에 에러가 발생했습니다.");
        });
    }

    requestUserTodoInsert() {
        const url = "http://localhost:8080/user/api/intro";
            var result = fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
    
                }),
            }).then(Response => {
                
            }).catch((error) => {
    
                alert("서버 연결에 에러가 발생했습니다.");
            });
    }

    requestUserTodoUpdate() {
        const url = "http://localhost:8080/user/api/intro";
            var result = fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
    
                }),
            }).then(Response => {
                
            }).catch((error) => {
    
                alert("서버 연결에 에러가 발생했습니다.");
            });
    }

    requestUserTodoDelete() {
        const url = "http://localhost:8080/user/api/intro";
            var result = fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
    
                }),
            }).then(Response => {
                
            }).catch((error) => {
    
                alert("서버 연결에 에러가 발생했습니다.");
            });
    }
}

// function init() {
//     requestMainPosts();
// }

// function requestMainPosts(event) {
//     event.preventDefault();
//     const url = "";
//     var result = fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({

//         }),
//     }).then(Response => {
//         data(Response);

//     }).catch((error) => {

//         alert("서버 연결에 에러가 발생했습니다.");
//     });
// }
