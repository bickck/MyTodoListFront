

export class Quote {


    // requestMainPosts(event) {
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
    
    //     }).catch((error)=> {
           
    //         alert("서버 연결에 에러가 발생했습니다.");
    //     });
    // }

    // requestSearchUserQuoteById(event,arg) {
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
    
    //     }).catch((error)=> {
           
    //         alert("서버 연결에 에러가 발생했습니다.");
    //     });
    // }

    requestUserQuoteSave(event) {
        event.preventDefault();
        const url = `/quote/manage/save`;
        var result = fetch(url, {
            method: 'POST',
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

    requestUserQuoteUpdate(event) {
        event.preventDefault();
        const url = `/quote/manage/update/${id}`;
        var result = fetch(url, {
            method: 'POST',
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

    requestUserQuoteDelete(event) {
        event.preventDefault();
        const url = `/quote/manage/delete/${id}`;
        var result = fetch(url, {
            method: 'POST',
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

// /quote/manage/save
// /quote/manage/update
// /quote/manage/delete