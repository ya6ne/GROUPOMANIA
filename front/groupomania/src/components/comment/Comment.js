/* import {useState, useEffect} from 'react'; */
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useState, useEffect} from 'react';
import './comment.css'
import Delcom from './Delcom';


function Comment({postId}){
    const [isOpen, setIsOpen] = useState(false);
    const [coms, setComs] = useState();
    const { register, handleSubmit, reset} = useForm();

    let mytoken = localStorage.getItem('token');
    let id = localStorage.getItem('id')
    const config = {
           headers: {'Authorization': `Bearer ${mytoken}` }
       };
    const onSubmit = coms => {
        coms.PostId = postId
        axios.post("http://localhost:3000/api/coms/", coms, config)
        .then(res => {reset()}) /* effacer le contenue du form */
        .catch(err => console.log(err))
        
        
        
    }
    
    let numbofcoms = []
    coms && numbofcoms.push(coms.filter(x => x.postId === postId).length)
    
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
    }, [])

    
    


    return (
        
        
        <div>
            <button onClick={isOpen ? () => setIsOpen(false) : () => setIsOpen(true)} className="btn btn-primary mr-2 mt-2">Commenter ({numbofcoms}) </button>
        {   
            isOpen ? 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <span>
                        {
                            coms && coms.map(x => (
                                <div key={x.id}>
                                    {postId == x.postId ? (<div className="comment">
                                    {id == x.userId ? <div className="date"><Delcom comId={x.id} /></div> : false}
                                        <h6 className="auth">{x.User.firstname + ' '+ x.User.lastname +' ' + ':'}</h6>
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