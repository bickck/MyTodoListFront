const TodoImageComponent = (arg) => {

    const path = arg.path;

    if(path == null) {
        return null;
    }

    return ( 
        <a href="#detail-page-move" className="image featured">
            <img src={path} alt="" />
        </a>
    )
};

const UserImageComponent = (arg) => {

    const path = arg.path;

    if(path == null) {
        return null;
    }

    return <img src={path} alt="" />
    
}

export default {TodoImageComponent,UserImageComponent};

