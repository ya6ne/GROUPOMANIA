import logo from '../../assets/icon.png';
import {Link} from 'react-router-dom';

function Banner() {
    return (
        <div className="navbar-light bg-light">
            <div className='container'>
            <nav className="navbar navbar-expand-lg ">
                <Link className="navbar-brand" to="/signup">
                    <img src={logo} width="60" height="60" alt="logo de groupomania"></img><span style={{color:'#EE2E05',fontWeight:'bold'}}>Groupomania</span>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/signup">Inscription <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Connexion</Link>
                        </li>
                        <li className="nav-item">
                            <a class="nav-link" href="mailto:admin@groupomania.fr">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        </div>

    )

}

export default Banner