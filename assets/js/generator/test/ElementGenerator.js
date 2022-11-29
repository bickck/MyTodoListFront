// var quoteElement = {
//     articleContainer: document.createElement("article"),
//     headerContainer: document.createElement("header"),
//     headerTitle: document.createElement("div"),
//     quoteId: document.querySelector("p"),
//     quote: document.createElement("h3"),
//     author: document.createElement("p"),
//     isPublish: document.createElement("p"),
//     metaContainer: document.createElement("div"),
//     createTime: document.createElement("time"),
//     userInfoLink: document.createElement("a"),
//     userinfo: document.createElement("span"),
//     userImage: document.createElement("img"),
//     footerContainer: document.createElement("footer"),
//     ulStats: document.createElement("ul"),
//     liHeart: document.createElement("li"),
//     heart: document.createElement("a")
// }

// 배치에 필수적인 태그 생성


// var article = document.createElement("article");
// var header = document.createElement("header");
// var div = document.createElement("div");
// var footer = document.createElement("footer");

// var a = document.createElement("a");
// var p = document.createElement("p");
// var h1 = document.createElement("h1");
// var h2 = document.createElement("h2");
// var h3 = document.createElement("h3");
// var h4 = document.createElement("h4");
// var h5 = document.createElement("h5");

// var time = document.createElement("time");
// var span = document.createElement("span");
// var img = document.createElement("img");
// var ul = document.createElement("ul");
// var li = document.createElement("li");





// export class ElementGenerator {
//     article = document.createElement("article");;
//     header;
//     div;
//     footer;
//     a;
//     h;
//     time;
//     span;
//     img;
//     ul;
//     li;

//     // constructor() {
//     //     article = document.createElement("article");
//     //     header = document.createElement("header");
//     //     div = document.createElement("div");
//     //     footer = document.createElement("footer");  
//     //     a = document.createElement("a");
//     //     p = document.createElement("p");
//     //     h = document.createElement("h2"); 
//     //     time = document.createElement("time");
//     //     span = document.createElement("span");
//     //     img = document.createElement("img");
//     //     ul = document.createElement("ul");
//     //     li = document.createElement("li");
//     // }

//     constructor(fontSize) {
//         this.article = document.createElement("article");
//         this.header = document.createElement("header");
//         this.div = document.createElement("div");
//         this.footer = document.createElement("footer");  
//         this.a = document.createElement("a");
//         this.p = document.createElement("p");
//         this.h = document.createElement(fontSize); 
//         this.time = document.createElement("time");
//         this.span = document.createElement("span");
//         this.img = document.createElement("img");
//         this.ul = document.createElement("ul");
//         this.li = document.createElement("li");
//     }

//     generatMainTodoElements() {
//         article.setAttribute("id","1");
//         return article;
//     }
//     generatMainQuoteElements() {
//         article.setAttribute("id","2")
//         return article;
//     }

//     generateMiniTodoElements() {

//     }

// }


var baseElement = {
    article : document.createElement("article"),
    header : document.createElement("header"),
}

var generator = function(argument) {

    if(argument.type == "TODO") {

        argument.baseElement = baseElement;

        return categorizeTodo(argument);
    }

    if(argument.type == "QUOTE") {

        argument.baseElement = baseElement;

        return categorizeQuote(argument)
    }

    if(argument.type == "BLURB") {

    }

    if(argument.type == "DETAIL") {

    }
}

function categorizeTodo(argument) {

    argument.baseElement.postIdentify = document.createElement("p");
    argument.baseElement.timeContainer = document.createElement("time");
    argument.baseElement.mainImageContainer = document.createElement("img");


    if(argument.detailType == "MAIN") {
        argument.baseElement.titleContainer = document.createElement("div");
        argument.baseElement.metaContainer = document.createElement("div");
        argument.baseElement.title = document.createElement("h2");
        argument.baseElement.subtitle = document.createElement("p");
        argument.baseElement.mainContent = document.createElement("p");
        argument.baseElement.userContainer = document.createElement("a");
        argument.baseElement.username = document.createElement("span");
        argument.baseElement.userImage = document.createElement("img");
        argument.baseElement.stats = document.createElement("ul");
        argument.baseElement.footer = document.createElement("footer");
        argument.baseElement.heartContainer = document.createElement("li");
        argument.baseElement.heart = document.createElement("a");

    }

    if(argument.detailType == "MINI"){
        argument.baseElement.title = document.createElement("h2");
        argument.baseElement.heart = document.createElement("a");
        
    }

    if(argument.detailType == "POSTS") {

    }

    if(argument.type == "COMMENT") {
        
    }

    return setElementTodoStruct(argument);
}

function categorizeQuote(argument) {

    if(argument.detailType == "MAIN") {

    }

    if(argument.detailType == "MINI"){

    }

    if(argument.detailType == "POSTS") {
        argument.baseElement.postList = document.createElement("li");
    }

    return setElementTodoStruct(argument);
}

function setElementTodoStruct(argument) {

    if(argument.detailType == "MAIN") {
       
    }

    if(argument.detailType == "MINI"){

    }

    if(argument.detailType == "POSTS") {

    }

    if(argument.type == "COMMENT") {
        
    }
}




generator({type : "TODO", detailType : "MINI"});