/**
 *  이미지 API를 호출하는 파일
 */


export class ImageApi {

    async requestTodoImageById(arg) {
        // const url = backEndServerAddress + `/img/api/todo`;
        
        var result = await fetch(arg.url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        }).catch((error) => {
            console.log(error);
            alert("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }

    async requestUserImageByUserId(arg) {
        // const url = `/img/api/${arg.id}`;
        var result = await fetch(arg.url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        }).catch((error) => {
            console.log(error);
            alert("서버 연결에 에러가 발생했습니다.");
        });

        return result.json();
    }
}
