const mainPost = document.querySelector("#main");
/**
 * 유저의 TODO API를 호출하는 클래스
 */
export class Todo { 

    requestMainPosts(event) {
        event.preventDefault();
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

    requestUserMainPost(event) {
        event.preventDefault();
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
