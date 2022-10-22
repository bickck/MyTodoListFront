/**
 * 유저의 정보 API를 호출하는 파일
 */

export class Users {
    // 유저 정보 요청
    async requestUserDetails(arg) {
        const url = arg.url;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${arg.authorization}`
            },
        }).then(Response => {

        }).catch((error) => {
            console.log(error);
            console.log("서버 연결에 에러가 발생했습니다.");
        });
        
        return result.json();
    }

    async requestUserUpdate(arg) {
        const url = arg.url;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${arg.authorization}`
            },
            body: JSON.stringify({

            }),
        }).then(Response => {

        }).catch((error) => {
            console.log(error);
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }

    async requestUserDelete(arg) {
        const url = arg.url;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `${arg.authorization}`
            },
            body: JSON.stringify({

            }),
        }).then(Response => {

        }).catch((error) => {
            console.log(error);
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }
}

// user update url : /user/manage/update/intro/{id}
// user delete url : /user/manage/delete/{id}

// // 유저 정보 요청
// function requestUserDetails() {
//     const url = "http://localhost:8080/user/api/intro";
//     var result = fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         // body: JSON.stringify({

//         // }),
//     }).then(Response => {

//     }).catch((error) => {

//         alert("서버 연결에 에러가 발생했습니다.");
//     });
// }


// // 유저 메인 데이터 요청
// function requestUserMainPost(event) {
//     event.preventDefault();
//     const url = "http://localhost:8080/todo/api/todoData";
//     var result = fetch(url, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         // body: JSON.stringify({

//         // }),
//     }).then(Response => {
//         data(Response);

//     }).catch((error) => {

//         alert("서버 연결에 에러가 발생했습니다.");
//     });
// }
