import './App.scss'
import { MemoryRouter as Router } from 'react-router-dom';
import React, { useState } from 'react';
import { Authenticated } from './Context';
import Routes from './Routes';

function App() {
  // const location = useLocation()
  const [loggedIn, setloggedIn] = useState(localStorage.getItem('loggedIn') === 'true' ? localStorage.getItem('loggedIn') : false);

  return (
    <div className="App">
      <Authenticated.Provider value={{ loggedIn, setloggedIn }}>
        <Router>
          <Routes/>
        </Router>
      </Authenticated.Provider>

    </div>
  );
}

export default App;
