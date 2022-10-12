export class QuoteApi {

    requestMainPosts(event) {
        event.preventDefault();
        const url = "";
        var result = fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                
            }),
        }).then(Response => {
            data(Response);
    
        }).catch((error)=> {
           
            alert("서버 연결에 에러가 발생했습니다.");
        });
    }

    requestSearchUserQuoteById(event,arg) {
        event.preventDefault();
        const url = "";
        var result = fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                
            }),
        }).then(Response => {
            data(Response);
    
        }).catch((error)=> {
           
            alert("서버 연결에 에러가 발생했습니다.");
        });
    }
}