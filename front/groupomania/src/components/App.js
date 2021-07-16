import '../App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Banner from './banner/Banner';
import Banner2 from './banner/Banner2';
import Banner3 from './banner/Banner3';
import Footer from './footer/Footer';
import Signup from './signup/Signup';
import Login from './login/Login';
import Welcome from './welcome/Welcome';
import Post from './post/Post';
import Editprofil from './profil/Editprofil';

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/signup" component={Banner} />
      <Route path="/login" component={Banner2} />
      <Route path="/welcome" component={Banner3} />
      <Route path="/post" component={Banner3} />
      <Route path="/editprofil" component={Banner3} />
      </Switch>
      <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/post" component={Post} />
      <Route path="/editprofil" component={Editprofil} />
      </Switch>

      <Footer />
    </Router>
    
  );
}

export default App;
