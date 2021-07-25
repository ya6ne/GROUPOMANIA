import axios from 'axios';
import {useState, useEffect} from 'react';
import Comment from '../comment/Comment';
import Profil from '../profil/Profil';
import Deletepost from '../post/Deletepost';


function Welcome(props) {
    const [item,setItem] = useState();
    let mytoken = localStorage.getItem('token');
    let id = localStorage.getItem('id');

    useEffect(() => {
        axios.get("http://localhost:3000/api/posts/", {
            headers:{
                'Authorization': `Bearer ${mytoken}`
            }
        })
        .then(data => {
            setItem(data.data);
        })
        .catch(e => console.log(e))
    }, [])
  
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <Profil props={props} />
                </div>
                <div className="col-md-8">
                { item &&
                item.map( x => (
                    
                <div key={x.id}>
                    <div className="card mt-3" >
                        <div className="card-body"> 
                            <h6 className="card-title" style={{color:"#ee2e05"}}>{x.title} </h6>
                            <p className="card-text">{x.content}.</p>
                            <img className="card-img-top" src={x.attachement} alt="Card image cap"></img>
                            <p>posté par <a href={"mailto:" + x.User.email}>{x.User.firstname} {x.User.lastname}</a></p>
                            {
                                id == x.userId && (<Deletepost postId={x.id} props={props}/>)
                            }
                            <Comment postId={x.id} props={props} />

                        </div>
                    </div>
                    
                </div>
                )).reverse()
            }               
                </div>

            </div>
            
        </div>
    )
    
}

export default Welcome