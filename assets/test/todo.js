import {
    TodoImageComponent,
    UserImageComponent
} from "./../js/generator/action/TodoImageComponent.js";

// const TodoImageComponent = (arg) => {

//     const path = arg.path;

//     if(path == null) {
//         return null;
//     }

//     return (
//         <a href="#detail-page-move" className="image featured">
//             <img src={path} alt="" />
//         </a>
//     )
// }

// const UserImageComponent = (arg) => {

//     const path = arg.path;

//     if(path == null) {
//         return null;
//     }

//     return (
//         <img src={path} alt="" />
//     )
// }

const TodoMainGenerator = (arg) => {

    const path = "";
    const id = `TODO_ID-${arg.id}`;
    const title = arg.title;
    const postSubTitle = "";
    const postContent = "";
    const username = "";
    const createTimeStamp = "";
    const heart = arg.heart;
    const comment = arg.heart;

    return (
        <article className="post">
             <header>
                 <div className="title">
                    <p id={id} value="1" hidden></p>
                     <h2><a href="single.html">{title}</a></h2>
                     <p>{postSubTitle}</p>
              </div>
                 <div className="meta">
                     <time className="published" dateTime={createTimeStamp}>{createTimeStamp}</time>
                     <a href="#" className="author">
                        <span className="name">{username}</span>
                        <UserImageComponent/>
                    </a>
                 </div>
             </header>
             <TodoImageComponent path={path}/>
             <p>{postContent}</p>
             <footer>
                 <ul className="stats">
                     <li>
                        <a id="heart-1" className="icon solid fa-heart heart" value="0">{heart}</a>
                    </li>
                     <li>
                        <a id="Comment-PostID-1" className="icon solid fa-comment comment">{comment}</a>
                     </li>
                 </ul>
             </footer>
         </article>
    );
}

const TodoMiniPostGenerator = (arg) => {

    const path = "";
    const todoId = `TODO_ID-${arg.id}`;
    const title = arg.title;
    const createTimeStamp = arg.createTimeStamp;
    const heart = arg.heart;
    const comment = arg.heart;

    return (
        <article className="mini-post">
            <header>
                <p id={todoId} value="" hidden></p>
                <h3>
                    <a className="post-details">{title}</a>
                </h3>
                <a className="icon solid fa-heart heart" href="#">{heart}</a>
                <a className="icon solid fa-comment comment" href="#">{comment}</a>
                <time className="published" dateTime="2022.22.22">{createTimeStamp}</time>
                <UserImageComponent/>
            </header>
            <TodoImageComponent path={path}/>
        </article>
    )
}

const TodoPostsGenerator = (arg) => {

    const path = "";
    const todoId = `TODO_ID-${arg.id}`;
    const title = arg.title;
    const createTimeStamp = arg.createTimeStamp;

    return ( 
        <li>
            <article>
                <TodoImageComponent path={path}/>
                <header>
                <p id={todoId}></p>
                    <h3>
                        <a>{title}</a>
                    </h3>
                    <time className="published" dateTime={createTimeStamp}>{createTimeStamp}</time>
                </header>
            </article>
        </li>
    );
}


export {
    TodoMainGenerator,
    TodoMiniPostGenerator,
    TodoPostsGenerator
};