import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Filters from './components/ZleceniaFiltry';
import Zlecenia from './components/Zlecenia';
import Pomiaryfiltry from './components/PomiaryFiltry';
import Pomiarytab from './components/PomiaryTab';
import Zleceniedetale from './components/ZlecenieDetale';
import Zdjecie from './components/Zdjecie';
import Filterimages from './components/FilterImages';
import './App.scss'

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
              <Filterimages />
              <Zdjecie />
            </>
          </Route>
          <Route path='/logowanie'>
            <div>
              Nie ma logowania :)
            </div>
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
