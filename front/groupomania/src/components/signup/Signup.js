import sm from '../../assets/sm.png';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useState} from 'react';

function Signup(props){
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
        <div className="container">
            <h3 className="mt-5">Inscription</h3>
            <div className="row">
                <div className="col-md-4 mt-4 mb-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="name">Nom</label>
                            <input type="text" className="form-control" id="name" {...register("lastname", { required: true })}  placeholder="Nom de famille"></input>
                            <small id="emailHelp" className="form-text text-muted">champs requis</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Prénom</label>
                            <input type="text" className="form-control" id="lastname" {...register("firstname", { required: true })}  placeholder="Prénom"></input>
                            <small id="emailHelp" className="form-text text-muted">champs requis</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Adresse mail</label>
                            <input type="email" className="form-control" id="email" {...register("email", { required: true })}  placeholder="Enter email"></input>
                            <small id="emailHelp" className="form-text text-muted">champs requis</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" className="form-control" id="password" {...register("password", { required: true })} placeholder="Password"></input>
                            <small id="emailHelp" className="form-text text-muted">minimum 8 caractères avec au moins 1 majuscule 1 minuscule 1 caractère.</small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label" >Photo de profil</label>
                            <input className="form-control" type="file" {...register("userPhoto", { required: false })} id="formFile"></input>
                        </div>
                        <div style={{color: "red"}}>{error && error}</div>

                        <button type="submit" className="btn btn-primary mt-3">Je m'inscris</button>
                    </form>
                </div>

                <div className="col-md-8">
                    <img src={sm} className="img-fluid rounded mt-2"  alt="siege de groupomania"></img>
                </div>
            </div>
        </div>
    )
}

export default Signup;


/* axios.post("http://localhost:3000/api/auth/signup",userPhoto, {
                headers: {
                    'Content-Type': 'application/json' || 'multipart/form-data'
                  }
            }) */