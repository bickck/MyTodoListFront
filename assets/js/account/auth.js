class auth {

    getKey() {
        return window.sessionStorage.getKey("_jwt");
    }

    setKey(token) {
        window.sessionStorage.setItem("_jwt", token);
    }
}