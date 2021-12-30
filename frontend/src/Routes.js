import React from 'react';
import { useContext } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Zlecenia from './components/Zlecenia';
import Pomiarytab from './components/PomiaryTab';
import Zleceniedetale from './components/ZlecenieDetale';
import Zdjecie from './components/Zdjecie';
import Login from './components/Login';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Authenticated } from './Context';


const Routes = () => {
    const location = useLocation()
    const { loggedIn } = useContext(Authenticated)
    return (
        <div>
            <Navbar />
            <TransitionGroup>
                <CSSTransition
                    timeout={500}
                    classNames='fade'
                    key={location.key}>
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

                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div >
    );
}

export default Routes;
