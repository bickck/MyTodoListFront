import {
    Auth
} from "./../account/auth.js";

const auth = new Auth();

export class HeartApi {

    async requestTodoHeartExists(arg) {
        const url = backEndServerAddress + `/heart/api/todo/${arg.id}`;

        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            },
        }).catch((error) => {
            console.log(error);
        });

        return result.json();
    }

    async requestQuoteHeartExists(arg) {
        const url = backEndServerAddress + `/heart/api/quote/${arg.id}`;

        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": auth.getJsonToken()
            }
        }).catch((error) => {
            console.log(error);
        });

        return result.json();
    }
}