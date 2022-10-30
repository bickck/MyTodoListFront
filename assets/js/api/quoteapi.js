/**
 *  Quote API를 호출하는 파일
 */


export class QuoteApi {


    async requestMainQuotes() {
        const url = backEndServerAddress  + "/quote/api/mainquote";

        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        }).catch((error)=> {
            console.log(error);
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }

    async requestSearchUserQuoteById(arg) {
        const url = backEndServerAddress  + `/quote/api/${arg.id}`;
        
        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((error)=> {
            console.log(error);
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }

    async requestDailyQuotes() {
        const url = backEndServerAddress  + "/quote/api/daily";

        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((error)=> {
            console.log(error);
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }

    async requestRecommandQuotes() {
        const url = backEndServerAddress  + "/quote/api/recommand";

        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((error)=> {
            console.log(error);
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }
}
