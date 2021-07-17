import {useForm} from 'react-hook-form';
import axios from 'axios';

function Post() {
    const { register, handleSubmit } = useForm();
    let mytoken = localStorage.getItem('token');
 const config = {
        headers: {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${mytoken}` }
    };
    
    

    
    const onSubmit = post => {
        const myPost = new FormData();
        myPost.append("attachement", post.attachement[0]);
        myPost.append("post", JSON.stringify(post))
        console.log(post)
        axios.post("http://localhost:3000/api/posts/", myPost, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
    }



    return (
        <div className="container">
            <h3 className="mt-5">Ajouter un</h3>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="name">Titre</label>
                            <input type="text" className="form-control" id="title" {...register("title", { required: true })}  placeholder="Titre de l'article"></input>
                            <small id="emailHelp" className="form-text text-muted">champs requis</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Article</label>
                            <textarea type="text" rows="5" style={{resize: 'none'}} className="form-control" id="article" {...register("content", { required: true })}  placeholder="Votre article ici"></textarea>
                            <small id="emailHelp" className="form-text text-muted">champs requis</small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label" >Telecharger une photo</label>
                            <input className="form-control" type="file" {...register("attachement", { required: false })} id="formFile"></input>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Poster</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Post;