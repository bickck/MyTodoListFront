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
            title : "데이터가 없어요."
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
            title : "데이터가 없어요."
        }

        var section = post.crateMiniPost(arg);
        // var title = section.children[0].children[0].children[0];
        // var time =  section.children[0].children[1];
       
        // title.innerText = "데이터가 없어요";
        // time.innerText = "none";

        return section;
    }


    /**
     * 
     * <ul class="posts">
     */
    createNonPosts() {

        var arg = {
            title : "데이터가 없어요."
        }

        var section = post.createPostList(arg);
        // var title = section.children[0].children[0].children[0].children[0];
        // var time = section.children[0].children[0].children[1];

        // title.innerText = "데이터가 없어요."
        // time.innerText = "none"
        
        return section;
    }
}



