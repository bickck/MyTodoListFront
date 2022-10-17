/**
 *  Quote API를 호출하는 파일
 */


export class QuoteApi {


    async requestMainPosts() {
        const url = "/quote/api/mainQuote";
        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        }).catch((error)=> {
            console.log(error);
            alert("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }

    async requestSearchUserQuoteById(arg) {
        const url = `/quote/api/${arg.id}`;
        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((error)=> {
            console.log(error);
            alert("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }
}