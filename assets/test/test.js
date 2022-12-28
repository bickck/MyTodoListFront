const TodoImageGenerator = (arg) => {


    const path = arg.path;

    if(path == null) {
        return null;
    }

    return (
      
        <a href="#detail-page-move" className="image featured">
            <img src={path} alt="" />
        </a>
       
    )
}

const UserImageGenerator = (arg) => {

    const path = arg.path;

    if(path == null) {
        return null;
    }

    return (
        <img src={path} alt="" />
    )
}


const CreateMainTodoGenerator = (arg) => {

    const path = "images/pic01.jpg";
    const todoId = "";
    const title = "";
    const createTimeStamp = "";
    const heart = 0;
    const comment = 0;

    return (
        <article className="post">
             <header>
                 <div className="title">
                     <p id="PostID-1" value="1" hidden></p>
                     <h2>
                        <a href="single.html">Magna sed adipiscing</a>
                    </h2>
                     <p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
              </div>
                 <div className="meta">
                     <time className="published" dateTime="2015-11-01">November 1, 2015</time>
                     <a href="#" className="author">
                        <span className="name">Jane Doe</span>
                        <img src="images/avatar.jpg" alt="" />
                    </a>
                 </div>
             </header>
             <TodoImageGenerator path={path}/>
             <p>test1234</p>
             <footer>
                 {/* <ul className="actions">
                     <li><a href="single.html" className="button large">Continue Reading</a></li>
                 </ul> */}
                 <ul className="stats">
                     <li><a id="heart-1" className="icon solid fa-heart heart" value="0">0</a></li>
                     <li><a id="Comment-PostID-1" className="icon solid fa-comment comment">0</a></li>
                 </ul>
             </footer>
         </article>
    );
}

const CreateTodoMiniPostGenerator = (arg) => {

    const todoId = "";
    const title = "";
    const createTimeStamp = "";
    const heart = 0;
    const comment = 0;
     

    return (
        <article className="mini-post">
            <header>
                <p id="PostID-undefined" value="" hidden></p>
                <h3>
                    <a className="post-details"></a>
                </h3>
                <a className="icon solid fa-heart" href="#">{heart}</a>
                <a className="icon solid fa-comment" href="#">{comment}</a>
                <time className="published" dataTime="2022-10-13">{createTimeStamp}</time>
                <UserImageGenerator/>
            </header>
            <TodoImageGenerator path={path}/>
        </article>
    )
}

const CreateTodoPostsGenerator = (arg) => {

    const todoId = `TODO_ID-${arg.todoId}`;
    const title = "";
    const createTimeStamp = "";
    const heart = 0;
    const comment = 0;

    return ( 
        <li>
            <article>
                <TodoImageGenerator/>
                <header>
                    <p id={todoId}></p>
                    <h3>
                        <a>{title}</a>
                    </h3><time className="published" dateTime="undefined">undefined</time>
                </header>
            </article>
        </li>
    );
}


const CreateQuotePostGenerator = (arg) => {

    const quote = "";
    const author = "";
    const username = "";
    const createTimeStamp = "";
    const heart = 0;

    return (
        <article className="post quote">
            <header>
                <div className="title">
                    <p id="QUOTE_ID-undefined" value="" hidden/>
                    <h3 id="quote" value={quote}>{quote}</h3>
                    <p id="author" value={author}>{author}</p>
                </div>
                <div className="meta">
                    <time className="published" datetime="undefined">{createTimeStamp}</time>
                    <a className="author" href="#user">
                        <span className="username" value={username}>{username}</span>
                    </a>
                </div>
            </header>
            <footer>
                <ul className="stats">
                    <li><a className="icon solid fa-heart heart" value={heart}>{heart}</a></li>
                </ul>
            </footer>
        </article>
    );
}

const CreateQuoteListGenerator = (arg) => {

    const quote = "";
    const author = "";
    const createTimeStamp = "";
    const heart = 0;

    return (
        <li>
            <article>
                <header>
                    <h3 value="">{quote}</h3>
                    <p value="">{author}</p>
                        <ul className="stats">
                            <li><a className="icon solid fa-heart">{heart}</a></li>
                            <li><time className="published" datetime="">{createTimeStamp}</time></li>
                        </ul>
                </header>
            </article>
        </li>
    );
}