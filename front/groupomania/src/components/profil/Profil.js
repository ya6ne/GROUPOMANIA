import './profil.css';

function Profil({props}){
    let firstname = localStorage.getItem("firstname");
    let lastname = localStorage.getItem("lastname");
    let userPhoto = localStorage.getItem("userPhoto");
    

    return (
        <div className="mt-3 card profil">
            <div className="flexprofil">
                <div className='imgcroper  mt-3'>
                    <img className="imgProfil" alt='profil' src={userPhoto}></img>
                </div>
                <h5 className="name">Bonjour {firstname} {lastname}</h5>
            </div>
            <div>
            <div><button onClick={() =>{ props.history.push('/post')}} type="submit" className="btn btn-primary mt-3 ml-1">Poster un article</button></div>
            <div><button type="submit" className="btn btn-link mt-2">Modifier un article</button></div>
            <div><button onClick={() =>{ props.history.push('/editprofil')}} type="submit" className="btn btn-link mt-2 mb-3">Modifier mon profil</button></div>
            </div>
        </div>
    )
}

export default Profil