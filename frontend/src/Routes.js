import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Zlecenia from './components/Zlecenia';
import Pomiarytab from './components/PomiaryTab';
import Zleceniedetale from './components/ZlecenieDetale';
import Zdjecie from './components/Zdjecie';
import Login from './components/Login';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Authenticated, Measurements, Paths } from './Context';
import axiosInstance from './axios';


const Routes = () => {

    const [measurements, setMeasurements] = useState([]);
    const [paths, setPaths] = useState([]);
    // const history = useHistory();
    useEffect(() => {
        // const fetchData = async () => {
        //     const types = await axiosInstance.get('filter-info/')
        //     console.log(types)
        //     // setPaths(types.data.trasy)
        //     // setMeasurements(types.data.mierzone_wartosci)
        // }
        // fetchData()
        // console.log('Hey')
    }, [])

    const [zlecenia, setZlecenia] = useState([]);
    const location = useLocation()
    const { loggedIn } = useContext(Authenticated)
    return (
        <div>
            <Paths.Provider value={{ paths, setPaths }}>
                <Measurements.Provider value={{ measurements, setMeasurements }}>
                    <Navbar />
                    {/* <TransitionGroup>
                <CSSTransition
                    timeout={0}
                    classNames='fade'
                    key={location.key}> */}
                    <Switch>
                        <Route path='/login'>
                            {loggedIn ?
                                <Redirect to="/" /> :
                                <Login />}
                        </Route>
                        <Route path='/' exact>
                            {loggedIn ?
                                <Zlecenia zlecenia={zlecenia} setZlecenia={setZlecenia} /> :
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
                    {/* </CSSTransition>
            </TransitionGroup> */}
                </Measurements.Provider>
            </Paths.Provider>
        </div >
    );
}

export default Routes;
