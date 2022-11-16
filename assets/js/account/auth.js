export class Auth {

    
    getJsonToken() {
        return window.sessionStorage.getItem("_jwt");
    }

    setJsonToken(token) {
        window.sessionStorage.setItem("_jwt", token);
    }

    // async login(arg) {
    
    //     const url = backEndServerAddress + "/auth/login";
    //     console.log(arg.email);
    //     console.log(arg.password);
    
    //     var result =  fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             email: `${arg.email}`,
    //             password: `${arg.password}`,
    //         }),
    //     })
    //     .then(Response => Response.text())
    //     .then((data)=>{
    //         console.log(data);
    //         setJsonToken(data);  
    //         window.location.href = mainPageAddress;
    //     }).catch((error)=> {
    //         console.log(error);
    //     });
    // }

    // async logout(arg) {
        
    //     var result = fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             email: `${arg.email}`,
    //             password: `${arg.password}`,
    //         }),
    //     })
    //     .then(Response => Response.text())
    //     .then((data)=>{
    //         // auth.setJsonToken(data);
    //         // remove json token
    //         window.location.href = mainPageAddress;
    //     }).catch((error)=> {
    //         console.log(error);
    //     });

    //     return result.json();
    // }

    // async register(arg) {
    //     const url = backEndServerAddress + "/auth/register";

    //     var result = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             username: `${arg.username}`,
    //             password: `${arg.password}`,
    //             email : `${arg.email}`,
    //         }),
    //     })
    //     .then(Response => {
    //         if (Response.status.toString() === "201") {
    //             console.log("회원가입 성공");
    //             // window.location.href = mainPageAddress;
    //         }
    
    //     }).catch((error)=> {
    //         console.log(error);
    //     });

    //     return result.json();
    // }

    // async emailDuplicationCheck(arg) {
    //     const url = backEndServerAddress + "/valid/emailduplication";

    //     var status;
    //     var result = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             email : `${arg.email}`,
    //         }),
    //     })
    //     .then(Response => Response.text())
    //     .then((data)=> {
    //         status = data;
    //     })
    //     .catch((error)=> {
    //         console.log(error);
    //     });

    //     return status;
    // }
}