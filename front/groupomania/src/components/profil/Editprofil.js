import './profil.css';
import sm from '../../assets/sm.png';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useState} from 'react';

function Editprofil(props){
    let firstname = localStorage.getItem("firstname");
    let userPhoto = localStorage.getItem("userPhoto");
    let lastname = localStorage.getItem("lastname");
    
    const { register, handleSubmit } = useForm();
    const [error,setError] = useState();
    
    
    const onSubmit = user => {
        console.log(user.userPhoto[0])
        const userPhoto = new FormData();
        userPhoto.append('userPhoto', user.userPhoto[0])
        userPhoto.append('user', JSON.stringify(user))
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/auth/signup',
            data: userPhoto,
            Headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
        .then(res => {
            console.log(res);
            alert('Félicitation, votre compte a été créé, vous pouvez vous identifier');
            props.history.push('/login')
   
        })
        .catch(err => {
            console.log(err);
            setError(err.response.data.error);
        })
        
    }


    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h5>Modification de vos données</h5>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name">Nom</label>
                                <input type="text" className="form-control" id="name" {...register("lastname", { required: true })}  placeholder={lastname}></input>
                                <small id="emailHelp" className="form-text text-muted">champs requis</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Prénom</label>
                                <input type="text" className="form-control" id="lastname" {...register("firstname", { required: true })}  placeholder={firstname}></input>
                                <small id="emailHelp" className="form-text text-muted">champs requis</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" {...register("email", { required: true })}  placeholder="*****@*******"></input>
                                <small id="emailHelp" className="form-text text-muted">champs requis</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password" className="form-control" id="password" {...register("password", { required: true })} placeholder="********"></input>
                                <small id="emailHelp" className="form-text text-muted">minimum 8 caractères avec au moins 1 majuscule 1 minuscule 1 caractère.</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label" >Photo de profil</label>
                                <input className="form-control" type="file" {...register("userPhoto", { required: false })} id="formFile"></input>
                            </div>
                            <div style={{color: "red"}}>{error && error}</div>

                            <button type="submit" className="btn btn-warning mt-3">Modifier mon profil</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <h5>Supprimer le compte</h5>
                        <p>Attention cette action est irréversible</p>
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
                        <button type="submit" className="btn btn-danger mt-2 mb-3">Supprimer mon compte</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editprofil;