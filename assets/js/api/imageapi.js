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
        });

        return result.json();
    }

    async requestUserImage(arg) {
        
        const url = backEndServerAddress + `/image/api/user/${arg.uuid}`;
        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization" : auth.getJsonToken()
            }
        })
        // .then((data)=>{
        //     console.log(data);
        // })
        .catch((error) => {
            console.log(error);
        });

        
        return result.json();
    }

    async requestUserDefaultIntroImage(arg) {
        
        const url = backEndServerAddress + `/image/api/user/default`;
        var result = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization" : auth.getJsonToken()
            }
        }).catch((error) => {
            console.log(error);
        });

        return result.json();
    }
}
