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
     * <article class="post">
     */
    createNonMainPost() {

        var arg = {
            title : "데이터가 없어요.",
            isPublish : "publish",
            heart : 0,
            comment : 0,
            createTimeStamp : "2022-10-13"
        }

        var section = post.createMainPost(arg);
        
        return section;
    }

    /**
     * 
     * <div class="mini-posts">
     */

    createNonMiniPost() {

        var arg = {
            title : "데이터가 없어요.",
            isPublish : "publish",
            heart : 0,
            comment : 0,
            createTimeStamp : "2022-10-13"
        }

        var section = post.createMiniTodos(arg);
       
        return section;
    }


    /**
     * 
     * <ul class="posts">
     */
    createNonPosts() {

        var arg = {
            title : "데이터가 없어요.",
            heart : ""
        }

        var section = post.createPostList(arg);
        
        return section;
    }

    /**
     * 
     * <ul class="posts quote">
     */
     createNonPostQuote() {

        var arg = {
            title : "데이터가 없어요."
        }

        var section = post.createPostListQuote(arg);
        
        return section;
    }
}



