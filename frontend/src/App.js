import './App.scss'
import { MemoryRouter as Router, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Authenticated } from './Context';
import Routes from './Routes';

function App() {
  // const location = useLocation()
  const history = useHistory();
  useEffect(() => {
    console.log(history)
  }, [])
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
