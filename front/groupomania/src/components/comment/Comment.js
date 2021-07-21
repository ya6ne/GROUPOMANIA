/* import {useState, useEffect} from 'react'; */
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useState, useEffect} from 'react';
import './comment.css'
import moment from 'moment'



function Comment({postId}){
    const [isOpen, setIsOpen] = useState(false);
    const [coms, setComs] = useState();
    const { register, handleSubmit, reset} = useForm();
    let mytoken = localStorage.getItem('token');
    const config = {
           headers: {'Authorization': `Bearer ${mytoken}` }
       };
    const onSubmit = coms => {
        coms.PostId = postId
        axios.post("http://localhost:3000/api/coms/", coms, config)
        .then(res => {reset()})
        .catch(err => console.log(err))
    }
    useEffect(() => {
        axios.get("http://localhost:3000/api/coms/", {
            headers:{
                'Authorization': `Bearer ${mytoken}`
            }
        })
        .then(data => {
            setComs(data.data);
            
            
            
        })
        .catch(e => console.log(e))
    }, [coms])
    
    
    return (
        
        
        <div>
            <button onClick={isOpen ? () => setIsOpen(false) : () => setIsOpen(true)} class="btn btn-primary mr-2 mt-2">Commenter </button>
        {   
            isOpen ? 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <span>
                        {
                            coms && coms.map(x => (
                                <div key={x.id}>
                                    {postId == x.postId ? (<div className="comment"><h6 className="auth">{x.User.firstname + ' '+ x.User.lastname +' ' + ':'}</h6>
                                    <p>{x.content} <br></br>
                                    <span className="date">posté le {x.createdAt.split('T')[0].split('.')[0]} à {x.createdAt.split('T')[1].split('.')[0]}</span>
                                    </p>
                                    </div>):false}
                                </div>
                            ))
                        }
                    </span>
                    <div className="form-group">
                        <label htmlFor="comment"></label>
                        <textarea type="text"  className="form-control" {...register("content", { required: true })} id="comment" placeholder="Votre commentaire..."></textarea>
                        <small id="emailHelp" className="form-text text-muted">champs requis</small>
                        <button type="submit" className="btn btn-primary mt-3">Poster</button>
                    </div>
                </form> : false
        }  
        </div>
    )
}

export default Comment