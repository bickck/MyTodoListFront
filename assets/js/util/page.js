/**
 *  데이터가 없을 경우 나오는 스크립트
 */

import {
    PostGenerator
} from "../generator/post.js"
const post = new PostGenerator();

export class NonDataInjector {

    /**
     * 
     *  Main Todo Post Empty
     */
    createNonMainPost() {

        var arg = {
            title: "데이터가 없어요.",
            isPublish: "publish",
            heart: 0,
            comment: 0,
            createTimeStamp: "2022-10-13"
        }

        var section = post.createMainPost(arg);

        return section;
    }

    /**
     * 
     *  Main Todo Post Empty
     */
    createEmptyMainTodoPost() {

        var arg = {
            title: "데이터가 없어요. Todo",
            isPublish: "publish",
            username: "유저가 없어요.",
            content: "메인 데이터가 없어요.",
            heart: 0,
            comment: 0,
            createTimeStamp: "2022-10-13"
        }

        var section = post.createMainPost(arg);

        return section;
    }

    /**
     * 
     * Main Quote Post Empty
     * @returns section
     */

    createEmptyMainQuotePost() {

        var arg = {
            quote: "데이터가 없어요. Quote",
            isPublish: "publish",
            heart: 0,
            comment: 0,
            createTimeStamp: "2022-10-13"
        }

        var section = post.createMainQuote(arg);

        return section;
    }

    /**
     *  Mini Todo Post Empty
     * 
     * <div class="mini-posts">
     */

    createEmptyMiniPost() {

        var arg = {
            title: "데이터가 없어요.",
            isPublish: "publish",
            heart: 0,
            comment: 0,
            createTimeStamp: "2022-10-13",
            postImageCount: 0
        }

        var section = post.createMiniTodos(arg);

        return section;
    }


    /**
     * 
     * 
     * <ul class="posts">
     */
    createEmptyTodoList() {

        var arg = {
            title: "데이터가 없어요.",
            heart: ""
        }

        var section = post.createPostList(arg);

        return section;
    }

    /**
     * 
     */

    createEmptyQuoteList() {
        var arg = {
            title: "데이터가 없어요.",
            heart: ""
        }

        var section = post.createQuoteList(arg);

        return section;
    }

    /**
     * 
     * <ul class="posts quote">
     */
    createNonPostQuote() {

        var arg = {
            title: "데이터가 없어요."
        }

        var section = post.createPostListQuote(arg);

        return section;
    }


    // createEmptyComment() {

    //     var arg = {
    //         title: "데이터가 없어요."
    //     }

    //     var section = comment.createCommentElement(arg);

    //     return section;
    // }
}
