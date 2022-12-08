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

    isRegisterEmptyFormCheck(arg) {

        var messageLists = new Array();
        const username = arg.username;
        const email = arg.email;
        const password = arg.password;

        console.dir(arg.form);

        if (isTextValidationCheck(username)) {
            messageLists.push({
                id: "username",
                message: usernameNullErrorMessage,
                returnCode: false
            });
        } 
        if (isTextValidationCheck(email)) {
            messageLists.push({
                id: "email",
                message: emailNullErrorMessage,
                returnCode: false
            });
        } 
        if (isTextValidationCheck(password)) {
            messageLists.push({
                id: "password",
                message: passwordNullErrorMessage,
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

    isLoginEmptyFormCheck(arg) {

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
        } 

        if (password == null || typeof password == "undefined" || password == "") {
            messageLists.push({
                id: passwordContainer.id,
                message: passwordNullErrorMessage,
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

    isTextValidationCheck(text) {

        if (text == null || typeof text == "undefined" || text == "" || text.length == 0) {
            return false;
        }
        return true;
    }
    
    isEmailValidationCheck(email) {
        
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

}

function isTextValidationCheck(text) {

    if (text == null || typeof text == "undefined" || text == "") {
        return false;
    }
    return true;
}

function isEmailValidationCheck(email) {
    
    if(!regexpEmail.test(email)) {
        return false;
    }
    return true;
}

function isPasswordValidationCheck(password) {
   
    if(!regexpPassword.test(password)) {
        return false;
    }
    return true;
}