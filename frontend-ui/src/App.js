import './App.css';
import './temp.css';
import {Home} from './Screens/Home';
import { Login } from './Screens/Login';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='container-fluid background'>
          <nav className='navbar navbar-expand-sm navbar-dark'>
            <ul className='navbar-nav'>
              <li className='nav-item-'>
                  <NavLink to='/home'>
                    <img className='line img-thumnail' src='/logo-white-stacked-en.svg' width={120}/>
                  </NavLink>
                    <h4 className='nav-header mx-3 pt-4'>Scholarship Submission</h4>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path='/' component={Home}/>
          <Route path='/home' component={Home}/>
          <Route path='/login' component={Login}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
