// import { ElementGenerator } from "./assets/js/generator/test/ElementGenerator.js";
import { FormValidation } from "./assets/js/validation/formvalidation.js";



const todoFormvalidationTest = new FormValidation();
const quoteFormValidaionTest = new FormValidation();
const RegisterFormValidationTest = new FormValidation();
const LoginFormValidationTest = new FormValidation();

// console.log(todoFormvalidationTest.isTodoFormCheck("todo_save"));
// console.log(quoteFormValidaionTest.isQuoteFormCheck("quote_form"));
// console.log(RegisterFormValidationTest.isRegisterFormCheck("register_form"));
console.log(LoginFormValidationTest.isLoginFormCheck("login_form"));