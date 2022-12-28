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
        });

        return result.json();
    }

    async requestUserQuoteByUserName(username) {
        const url = backEndServerAddress + `/quote/api/${username}/quotes`;
        var result = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }

    async requestUserLikeQuoteByUserName(username) {
        const url = backEndServerAddress + `/quote/api/like/${username}`;
        var result = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .catch((error) => {
                console.log(error);
            });

        return result.json();
    }

}
