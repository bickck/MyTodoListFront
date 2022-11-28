/**
 * 
 */

var regexpEmail =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
var regexpPassword = /^[A-Za-z0-9]{6,12}$/;

var passedSuccessMessage = "SUCCESS";

var todoTitleNullErrorMessage = "Title를 입력해주세요.";
var todoContentNullErrorMessage = "Content를 입력해주세요.";

var qutoeTitleNullErrorMessage = "Quote를 입력해주세요.";
var quoteAuthorNullErrorMessage = "Author를 입력해주세요.";

var usernameNullErrorMessage = "Username를 입력해주세요.";
var emailNullErrorMessage = "Email를 입력해주세요.";
var emailRegExpErrorMessage = "Email 형식이 맞지 않습니다.";
var passwordNullErrorMessage = "Password 입력해주세요.";
var passwordRegExpErrorMessage = "Password 형식이 맞지 않습니다.";

export class FormValidation {

    isTodoFormCheck(todoFormId) {

        var messageLists = new Array();

        const titleContainer = document.querySelector(`#${todoFormId} > div > div > #title`);
        const contentContainer = document.querySelector(`#${todoFormId} > div > div > #content`);

        const title = titleContainer.value;
        const content = contentContainer.value;



        if (title == null || typeof title == "undefined" || title == "") {
            messageLists.push({
                id: titleContainer.id,
                message: todoTitleNullErrorMessage,
                returnCode: false
            });
        }
        if (content == null || typeof content == "undefined" || content == "") {
            messageLists.push({
                id: contentContainer.id,
                message: todoContentNullErrorMessage,
                returnCode: false
            });
        }

        if (messageLists == null || messageLists == [] || messageLists.length == 0) {
            messageLists.push({
                message: passedSuccessMessage,
                returnCode: true
            });
        }

        return messageLists;
    }

    isQuoteFormCheck(quoteFormId) {

        var messageLists = new Array();

        const quoteContainer = document.querySelector(`#${quoteFormId} > div > div > #quote`);
        const authorContainer = document.querySelector(`#${quoteFormId} > div > div > #author`);

        const quote = quoteContainer.value;
        const author = authorContainer.value;

        if (quote == null || typeof quote == "undefined" || quote == "") {
            messageLists.push({
                id: quoteContainer.id,
                message: qutoeTitleNullErrorMessage,
                returnCode: false
            });
        } 

        if (author == null || typeof author == "undefined" || author == "") {
            messageLists.push({
                id: authorContainer.id,
                message: quoteAuthorNullErrorMessage,
                returnCode: false
            });
        } 

        if (messageLists == null || messageLists == [] || messageLists.length == 0) {
            messageLists.push({
                message: passedSuccessMessage,
                returnCode: true
            });
        }

        return messageLists;
    }

    isRegisterFormCheck(registerFormId) {

        var messageLists = new Array();
        const usernameContainer = document.querySelector(`#${registerFormId} > div > div > div > div > #username`);
        const emailContainer = document.querySelector(`#${registerFormId} > div > div > div > div > #email`);
        const passwordContainer = document.querySelector(`#${registerFormId} > div > div > div > div > #password`);

        const username = usernameContainer.value;
        const email = emailContainer.value;
        const password = passwordContainer.value;


        if (username == null || typeof username == "undefined" || username == "") {
            messageLists.push({
                id: usernameContainer.id,
                message: usernameNullErrorMessage,
                returnCode: false
            });
        } else {

        }
        if (email == null || typeof email == "undefined" || email == "") {
            messageLists.push({
                id: emailContainer.id,
                message: emailNullErrorMessage,
                returnCode: false
            });
        } else {

        }
        if (password == null || typeof password == "undefined" || password == "") {
            messageLists.push({
                id: passwordContainer.id,
                message: passwordNullErrorMessage,
                returnCode: false
            });
        } else {

        }
        if (!regexpEmail.test(email) && email != null && email != "") {

            messageLists.push({
                id: emailContainer.id,
                message: emailRegExpErrorMessage,
                returnCode: false
            });
        } else {

        }

        if (!regexpPassword.test(password) && password != null && password != "") {

            messageLists.push({
                id: passwordContainer.id,
                message: passwordRegExpErrorMessage,
                returnCode: false
            });
        } else {

        }

        if (messageLists == null || messageLists == [] || messageLists.length == 0) {
            messageLists.push({
                message: passedSuccessMessage,
                returnCode: true
            });
        } else {

        }

        return messageLists;

    }

    isLoginFormCheck(loginFormId) {

        var messageLists = new Array();
        const emailContainer = document.querySelector(`#${loginFormId} > div > div > div > #email`);
        const passwordContainer = document.querySelector(`#${loginFormId} > div > div > div > #password`);
        const email = emailContainer.value;
        const password = passwordContainer.value;

        if (email == null || typeof email == "undefined" || email == "") {
            messageLists.push({
                id: emailContainer.id,
                message: emailNullErrorMessage,
                returnCode: false
            });
        } else {

        }

        if (password == null || typeof password == "undefined" || password == "") {
            messageLists.push({
                id: passwordContainer.id,
                message: passwordNullErrorMessage,
                returnCode: false
            });
        } else {

        }

        if (!regexpEmail.test(email) && email != null && email != "") {
            messageLists.push({
                id: emailContainer.id,
                message: emailRegExpErrorMessage,
                returnCode: false
            });
        } else {

        }

        if (!regexpPassword.test(password) && password != null && password != "") {
            messageLists.push({
                id: passwordContainer.id,
                message: passwordRegExpErrorMessage,
                returnCode: false
            });
        } else {

        }

        if (messageLists == null || messageLists == [] || messageLists.length == 0) {
            messageLists.push({
                message: passedSuccessMessage,
                returnCode: true
            });
        } else {

        }

        return messageLists;
    }

    isTextValidationCheck(text) {

        if (text == null || typeof text == "undefined" || text == "") {
            return false;
        }
        return true;
    }

    isEmailValidationCheck(email) {
        
        console.log(regexpEmail.test(email));
        if(!regexpEmail.test(email)) {
            return false;
        }
        return true;
    }

    isPasswordValidationCheck(password) {
       
        if(!regexpPassword.test(password)) {
            return false;
        }
        return true;
    }

    isEmailDuplicaitonValidCheck(email) {
        if (!isEmailValidationCheck(email)) {
            return false;
        }
        return true;
    }
}