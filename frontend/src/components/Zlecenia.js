import React, { useEffect, useState, useContext } from 'react';
import '../styles/Zlecenia.scss';
import { Link } from "react-router-dom";
import Filters from './ZleceniaFiltry';
import axiosInstance from '../axios.js';
import { Authenticated } from '../Context';


const Zlecenia = () => {
    const { setloggedIn } = useContext(Authenticated)
    const [zlecenia, setZlecenia] = useState([]);
    useEffect(async () => {
        console.log(localStorage.getItem('loggedIn'))
        try {
            const data = await axiosInstance.get('zlecenia/')
            setZlecenia(data.data)
        } catch (error) {
            setloggedIn(false)
            localStorage.setItem('loggedIn', false);
        }
    }, [])
    return (
        <>
        <Filters />
            <main className='zlecenia'>
                <ul>
                    {zlecenia.map(item => (
                        <Link to={{pathname: `/zlecenie/${item.id}`,
                        state: item.id}}  key={item.id}>
                        <li>
                            <div>
                                Zlecenie {item.id}
                            </div>
                            <div>
                                {item.typ_pojazdu === 'D'?"Dron":"Łódka"}
                            </div>
                            <div>
                                {item.planowana_data_realizacji.slice(0,10)}
                            </div>
                            <div>
                                {item.trasa}
                            </div>
                            <div>
                                {item.koniec_realizacji?"Zakończona":"Planowana"}
                            </div>
                        </li>
                    </Link>
                    ))}

                </ul>
            </main>
        </>
    );
}

export default Zlecenia;
