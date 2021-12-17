import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Filters from './components/ZleceniaFiltry';
import Zlecenia from './components/Zlecenia';
import Pomiaryfiltry from './components/PomiaryFiltry';
import Pomiarytab from './components/PomiaryTab';
import Zleceniedetale from './components/ZlecenieDetale';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <>
              <Filters />
              <Zlecenia />
            </>
          </Route>
          <Route path='/pomiary'>
            <>
              <Pomiaryfiltry />
              <Pomiarytab />
            </>
          </Route>
          <Route path='/zlecenie/:id'>
            <>
              <Zleceniedetale />
            </>
          </Route>
          <Route path='/zdj'>
            <>

            </>
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
