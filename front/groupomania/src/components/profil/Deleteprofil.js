import './profil.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useState} from 'react';

function Deleteprofil({props}){
    let mytoken = localStorage.getItem('token');
    const { register, handleSubmit } = useForm();
    const [error,setError] = useState();

    const onSubmit = user => {
        axios.post(process.env.REACT_APP_LOGIN, user)
        .then(res => {
            axios.delete(process.env.REACT_APP_DELETEPROFIL, {
                headers: {
                    'Authorization': `Bearer ${mytoken}` 
                }})
            .then(res2 => {
                alert(`Votre compte a bien été supprimé, nous espérons vous revoir très bientôt,vous allez être redirigé vers la page d'acceuil`);
                localStorage.clear();
                props.history.push('/signup');
            })
            .catch(err2 => console.log(err2))
        })
        .catch(err => {
            console.log(err.response.data.error);
            setError(err.response.data.error);
        })
    }
    return (
        <div>
            <div>
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
    )
}

export default Deleteprofil;