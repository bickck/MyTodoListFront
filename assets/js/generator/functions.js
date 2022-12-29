// fileName이 DEFAULT인 경우는 현재 가지고 있는 이미지가 없다.
function setUserProfileImageUrl(filePath, fileName) {

    var imageSource;
    
    if (filePath != "DEFAULT" && filePath != null) {
        imageSource = backEndServerAddress + `/image/api/user/source/${filePath}/${fileName}`;
    } else {
        imageSource = frontEndServerAddress + `/images/blank-profile-picture-gdf6b93f73_640.png`;

    }

    return imageSource;
}

function setUserProfileCommentStr(comment) {

    var resultComment;

    if (comment == null || comment == "") {
        resultComment = "당신의 코멘트를 적어주세요.";

    } else {
        resultComment = comment;
    }

    return resultComment;
}


function refreshCommentInputElement(commentID) {
    document.querySelector(`#${commentID}`).value = "";
}

export {
    setUserProfileImageUrl,
    setUserProfileCommentStr,
    refreshCommentInputElement
};