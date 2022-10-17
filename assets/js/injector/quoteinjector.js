/**
 * 
 */


class quoteInjector {

    quoteInjector(arg) {
        const id = document.querySelector("#post_id");
        const quote = document.querySelector("#quote");
        const author = document.querySelector("#author");
        const heart = document.querySelector(".fa-heart");

        id.innerText = arg.id;
        quote.innerText = arg.quote;
        author.innerText = `- ${arg.author} -`;
        heart.innerText = arg.heart;

        id.value = arg.id;
        quote.value = arg.quote;
        author.value = arg.author;
        heart.value = arg.heart;
    }

}
