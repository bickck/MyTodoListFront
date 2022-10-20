/**
 * 유저의 정보를 HTML 형식에 맞게 입력해주는 클래스 (Index.html)
 */


export class UserInjector {

    postUserIntroData(data, section) {
        var userIntroArea = userSection.childNodes[3];
        var username = userIntroArea.childNodes[1];
        var userComment = userIntroArea.childNodes[3];
        username.innerText = userdata.username;
        userComment.innerText = userdata.introComment;
    }
}
