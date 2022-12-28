const tokenName = "_jwt";

// function setJsonToken(token) {
//     window.sessionStorage.setItem(tokenName, token);
// }

export class Auth {

    
    getJsonToken() {
        return window.sessionStorage.getItem(tokenName);
    }

    getJosnToeknFromSessionStorage() {
        return window.sessionStorage.get(tokenName);
    }

    setJsonToken(token) {
        window.sessionStorage.setItem(tokenName, token);
    }

    setJsonTokenFromResponseHeader(Response) {
        if(Response.headers.has("authorization")) {
            const headerAuthorization = Response.headers.get("authorization");
            this.setJsonToken(headerAuthorization);
        }
    }

    removeToken() {
        window.sessionStorage.clear();
    }

    async isCheckUserPermissionCheck(username) {
        const url = backEndServerAddress  + `/auth/permission/${username}`;

        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization": this.getJsonToken()
            },
        }).catch((error)=> {
            console.log(error);
        });

        return result.text();
    }
}