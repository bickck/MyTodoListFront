const mainPost = document.querySelector("#main");
/**
 * 유저의 TODO API를 호출하는 클래스
 */
export class Todo { 

    requestUserTodoInsert(arg) {
        const url = `http://localhost:8080/user/todo/manage/save`;
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization" : arg.userToken,
            },
            body: JSON.stringify({
                title: `${arg.title}`,
                cotent: `${arg.content}`,
                isChekcPuhlic: `${arg.isCheckPublic}`
            }),
        }).then(Response => {
            if (Response.status.toString() === "200") {
                alert("저장 성공");
                window.location.href = mainPageAddress;
            }
    
        }).catch((error) => {
            console.log("서버 연결에 에러가 발생했습니다.");
            alert(error);
        });
    }

    requestUserTodoUpdate(arg) {
        const url = `http://localhost:8080/todo/manage/update/${id}`;
            var result = fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "" : ""
                }),
            }).then(Response => {
                
            }).catch((error) => {
    
                alert("서버 연결에 에러가 발생했습니다.");
            });
    }

    requestUserTodoDelete() {
        const url = `http://localhost:8080/todo/manage/delete/${id}`;
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


  //메인 데이터 
    // requestMainPosts(event) {
    //     //event.preventDefault();
    //     const url = "http://localhost:8080/todo/api/todoData";
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

    // requestUserTodByTodoId(event,arg) {
    //     //event.preventDefault();
    //     const url = `http://localhost:8080/todo/api/${id}`;
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