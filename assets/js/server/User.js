
// 유저 정보 요청
function requestUserDetails() {
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


 // 유저 메인 데이터 요청
 function requestUserMainPost(event) {
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