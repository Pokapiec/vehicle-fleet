import React, { useEffect, useState, useContext } from 'react';
import '../styles/PomiaryTab.scss'
import Pomiaryfiltry from './PomiaryFiltry';
import axiosInstance from '../axios.js';
import { Authenticated } from '../Context';


const Pomiarytab = () => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [path, setPath] = useState('');
    const [issueNumber, setIssueNumber] = useState('');
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(0);
    
    const filterProps = {
        setDateFrom: setDateFrom,
        setDateTo: setDateTo,
        setPath: setPath,
        setIssueNumber: setIssueNumber,
        setLow: setLow,
        setHigh: setHigh
    }

    const [pomiary, setPomiary] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const flattenData = (data) => {
        let arr = []
        data.forEach(elem => {
            elem.czujniki.forEach(inner => {
                // delete elem.czujniki
                arr.push({ ...elem, ...inner })
            })
        })
        return arr
    }

    useEffect(() => {
        let condition = []
        if(low) condition.push('elem.wartosc > low')
        if(high) condition.push('elem.wartosc < high')
        if(dateFrom) condition.push('Date.parse(elem.timestamp) > Date.parse(dateFrom)')
        if(dateTo) condition.push('Date.parse(elem.timestamp) < Date.parse(dateTo)')
        if(issueNumber) condition.push('elem.id == issueNumber')
        if(path) condition.push('elem.trasa == path')

        if(condition.length) {
            let filtersApplied = pomiary.filter(elem => {
                return eval(condition.join(' & '))
            }) 
            setFiltered(filtersApplied)
        } else {
            setFiltered(pomiary)
        }
    }, [dateFrom, dateTo, path, issueNumber, low, high]);

    useEffect(async () => {
        const data = await axiosInstance.get('pomiary/')
        setPomiary(flattenData(data.data))
        setFiltered(flattenData(data.data))
    }, [])

    return (
        <main className='pomiary'>
            <Pomiaryfiltry {...filterProps}/>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nr pomiaru</th>
                            <th>Trasa</th>
                            <th>timestamp</th>
                            <th>Długość geo</th>
                            <th>Szerokość geo</th>
                            <th>Wielkość</th>
                            <th>Wartość</th>
                            <th>Przekroczenie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.trasa}</td>
                                <td>{item.timestamp?item.timestamp.slice(0,10):item.timestamp}</td>
                                <td>{item.dlugosc_geo}</td>
                                <td>{item.szerokosc_geo}</td>
                                <td>{item.mierzona_wielkosc}</td>
                                <td>{item.wartosc}</td>
                                <td>{item.czy_norma_przekroczona?"Tak":"Nie"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div id='exports'>
                    <button>Export XLSX</button>
                    <button>Export XML</button>
                    <button>Export JSON</button>
                </div>
            </div>
        </main>
    );
}

export default Pomiarytab;
