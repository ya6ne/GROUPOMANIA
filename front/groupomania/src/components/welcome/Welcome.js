import axios from 'axios';
import {useState, useEffect} from 'react';
import Comment from '../comment/Comment';
import Profil from '../profil/Profil';


function Welcome(props) {
    console.log(props)
    const [item,setItem] = useState();
    let mytoken = localStorage.getItem('token');

    useEffect(() => {
        axios.get("http://localhost:3000/api/posts/", {
            headers:{
                'Authorization': `Bearer ${mytoken}`
            }
        })
        .then(data => {
            setItem(data.data);
            /* console.log(">>>>>>>",item[0].User.firstname) */
        })
        .catch(e => console.log(e))
    }, [])

    /* var today = new Date();
    var dateNoow = `${today.getFullYear()}-0${today.getMonth()}-${today.getDate()} ${today.toString().split(' ').[4]}` */
    
    
    
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
                    <div class="card mt-3" >
                        <div className="card-body">
                            <h6 className="card-title">{x.title} </h6>
                            <p className="card-text">{x.content}.</p>
                            <img className="card-img-top" src={x.attachement} alt="Card image cap"></img>
                            <p>posté par <a href="#">{x.User.firstname} {x.User.lastname}</a></p>
                            <Comment postId={x.id} />
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