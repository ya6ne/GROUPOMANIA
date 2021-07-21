import logo from '../../assets/icon.png';
import {Link} from 'react-router-dom';

function Banner3() {
    const deldata = (data) => {
        localStorage.clear() 
    }
    return (
        <div className="navbar-light bg-light">
            <div className='container'>
            <nav className="navbar navbar-expand-lg ">
                <Link className="navbar-brand" to="/welcome">
                    <img src={logo} width="60" height="60" alt="logo de groupomania"></img><span style={{color:'#EE2E05',fontWeight:'bold'}}>Groupomania</span>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" onClick={() => deldata()}>Déconnexion</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="mailto:admin@groupomania.fr">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        </div>

    )

}

export default Banner3