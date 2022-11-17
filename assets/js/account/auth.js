export class Auth {

    
    getJsonToken() {
        return window.sessionStorage.getItem("_jwt");
    }

    setJsonToken(token) {
        window.sessionStorage.setItem("_jwt", token);
    }
}