import React, { useEffect, useState, useContext } from 'react';
import '../styles/Zlecenia.scss';
import { Link } from "react-router-dom";
import Filters from './ZleceniaFiltry';
import axiosInstance from '../axios.js';
import { Authenticated } from '../Context';
import useFetch from '../utils/useFetch';


const Zlecenia = ({zlecenia, setZlecenia}) => {
    const [dateFromP, setDateFromP] = useState('');
    const [dateFromR, setDateFromR] = useState('');
    const [dateToP, setDateToP] = useState('');
    const [dateToR, setDateToR] = useState('');
    const [path, setPath] = useState('');
    const [zapl, setZapl] = useState(true);
    const [ukonczone, setUkonczone] = useState(true);
    const [dron, setDron] = useState(true);
    const [lodka, setLodka] = useState(true);

    const [filtered, setFiltered] = useState([]);
    const { setloggedIn } = useContext(Authenticated)
    // const [zlecenia, setZlecenia] = useState([]);

    const filterProps = {
        setDateFromP: setDateFromP,
        setDateFromR: setDateFromR,
        setDateToP: setDateToP,
        setDateToR: setDateToR,
        setPath: setPath,
        setZapl: setZapl,
        setUkonczone: setUkonczone,
        setDron: setDron,
        setLodka: setLodka,
    }

    useEffect(() => {
        // console.log(dateFromP, dateFromR, path, dateToP, dateToR, status)
        let condition = []
        if (dateFromP) condition.push('Date.parse(elem.planowana_data_realizacji) > Date.parse(dateFromP)')
        if (dateToP) condition.push('Date.parse(elem.planowana_data_realizacji) < Date.parse(dateToP)')
        if (dateFromR) condition.push('Date.parse(elem.koniec_realizacji) > Date.parse(dateFromR)')
        if (dateToR) condition.push('Date.parse(elem.koniec_realizacji) < Date.parse(dateToR)')
        if (path) condition.push('elem.trasa == path')

        if (zapl & !ukonczone) {
            condition.push('!elem.koniec_realizacji')
        } else if (!zapl & ukonczone) {
            condition.push('elem.koniec_realizacji')
        }

        if (dron & !lodka) {
            condition.push('elem.typ_pojazdu == "D"')
        } else if (!dron & lodka) {
            condition.push('elem.typ_pojazdu == "L"')
        }
        // console.log('condition', dron)
        // console.log(condition)
        // console.log('condition', lodka)

        if (condition.length > 0) {
            let filtersApplied = zlecenia.filter(elem => {
                return eval(condition.join(' & '))
            })
            // console.log(filtersApplied.length)
            setFiltered(filtersApplied)
        } else setFiltered(zlecenia)

    }, [dateFromP, dateFromR, path, dateToP, dateToR, zapl, ukonczone, dron, lodka]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axiosInstance.get('zlecenia/')
                if (zlecenia.length != data.data.length) {
                    console.log(zlecenia.length, data.data.length)
                    console.log("Fetching !")
                    setZlecenia(data.data)
                    setFiltered(data.data)
                }
            } catch (error) {
                setloggedIn(false)
                localStorage.setItem('loggedIn', false);
            }
        }
        fetchData()
        return () => setFiltered([])
    }, [])

    return (
        <>
            <Filters {...filterProps} />
            <main className='zlecenia'>
                <header className='titles'>
                    <span>Numer zlecenia</span>
                    <span>Pojazd</span>
                    <span>Data planowana</span>
                    <span>Trasa</span>
                    <span>Status</span>
                </header>
                <ul>
                    {filtered.map(item => (
                        <Link to={{
                            pathname: `/zlecenie/${item.id}`,
                            state: item.id
                        }} key={item.id}>
                            <li>
                                <div>
                                    Zlecenie {item.id}
                                </div>
                                <div>
                                    {item.typ_pojazdu === 'D' ? "Dron" : "Łódka"}
                                </div>
                                <div>
                                    {item.planowana_data_realizacji.slice(0, 10)}
                                </div>
                                <div>
                                    {item.trasa.split(' ').map(item => (
                                        <span>{item}<br/></span>
                                    ))}
                                </div>
                                <div>
                                    {item.koniec_realizacji ? "Zakończona" : "Planowana"}
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
