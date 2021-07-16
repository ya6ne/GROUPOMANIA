/* import { useState } from 'react'; */
import sm from '../../assets/sm.png';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useState} from 'react';


function Login(props){
    const { register, handleSubmit} = useForm();
    const [error,setError] = useState();
    const onSubmit = user => {
        console.log(user);
        axios.post("http://localhost:3000/api/auth/login", user)
        .then(res => {
            console.log(res)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("firstname", res.data.user.firstname);
            localStorage.setItem("lastname", res.data.user.lastname);
            localStorage.setItem("userPhoto", res.data.user.userPhoto);
               
            props.history.push('/welcome')
        })
        .catch(err => {
            console.log(err.response.data.error);
            setError(err.response.data.error);
        })
        
    }
    return (
        <div className="container">
            <h3 className="mt-5">Connexion</h3>
            <div className="row mb-5">
                <div className="col-md-4 mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" {...register("email", { required: true })} ></input>
                            <small id="emailHelp" className="form-text text-muted">champs requis</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword">Mot de passe</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" {...register("password", { required: true })}></input>
                            <small id="emailHelp" className="form-text text-muted">minimum 8 caractères avec au moins 1 majuscule 1 minuscule 1 caractère.</small>
                        </div>
                        <div style={{color: "red",fontFamily: "Arial"}}>{error && error}</div>
                        <button type="submit" className="btn btn-primary mt-3">Connexion</button>
                    </form>
                </div>

                <div className="col-md-8">
                    <img src={sm} className="img-fluid rounded mt-2"  alt="logo de groupomania"></img>
                </div>
            </div>
        </div>
        )
    
}

export default Login;