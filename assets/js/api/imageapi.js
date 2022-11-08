/**
 *  이미지 API를 호출하는 파일
 */

import {Auth} from "./../account/auth.js"

const auth = new Auth();

export class ImageApi {

    async requestTodoImageById(arg) {
         const url = backEndServerAddress + `/image/api/todo/${arg.id}`;
        
        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        }).catch((error) => {
            console.log(error);
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }

    async requestUserImage() {
        
        const url = backEndServerAddress + `/image/api/user`;
        var result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization" : auth.getJsonToken()
            }
        }).catch((error) => {
            console.log(error);
            console.log("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }
}
