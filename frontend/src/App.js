import './App.scss'
import { MemoryRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Zlecenia from './components/Zlecenia';
import Pomiarytab from './components/PomiaryTab';
import Zleceniedetale from './components/ZlecenieDetale';
import Zdjecie from './components/Zdjecie';
import Login from './components/Login';
import { Authenticated } from './Context';


function App() {
  const [loggedIn, setloggedIn] = useState(localStorage.getItem('loggedIn') === 'true' ?  localStorage.getItem('loggedIn') : false);

  return (
    <div className="App">
      <Authenticated.Provider value={{ loggedIn, setloggedIn }}>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/login'>
              {loggedIn ? 
              <Zlecenia /> : 
              <Login />}
            </Route>
            <Route path='/' exact>
              {loggedIn ?
                <Zlecenia /> :
                <Redirect to="/login" />}
            </Route>
            <Route path='/pomiary'>
              {loggedIn ?
                <Pomiarytab /> :
                <Redirect to="/login" />}
            </Route>
            <Route path='/zlecenie/:id'>
              {loggedIn ?
                <Zleceniedetale /> :
                <Redirect to="/login" />}
            </Route>
            <Route path='/zdj'>
              {loggedIn ?
                <Zdjecie /> :
                <Redirect to="/login" />}
            </Route>
            <Route path='/logowanie'>
              <div>
                Nie ma logowania !
              </div>
            </Route>
          </Switch>

        </Router>
      </Authenticated.Provider>

    </div>
  );
}

export default App;
