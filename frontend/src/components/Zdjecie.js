import React, { useEffect, useState } from 'react';
import '../styles/Zdjecie.scss'
import Filterimages from './FilterImages';
import axiosInstance from '../axios.js';


const Zdjecie = () => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [path, setPath] = useState('');

    const filterProps = {
        setDateFrom: setDateFrom,
        setDateTo: setDateTo,
        setPath: setPath,
    }

    const [przekroczs, setPrzekroczs] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        let condition = []
        if(dateFrom) condition.push('Date.parse(elem.timestamp) > Date.parse(dateFrom)')
        if(dateTo) condition.push('Date.parse(elem.timestamp) < Date.parse(dateTo)')
        if(path) condition.push('elem.trasa == path')

        if (condition.length > 0){
            let filtersApplied = przekroczs.filter(elem => {
                return eval(condition.join(' & '))
            }) 
            setFiltered(filtersApplied)
        } else {
            setFiltered(przekroczs)
        }
    }, [dateFrom, dateTo, path]);

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
    useEffect(async () => {
        const data = await axiosInstance.get('przekroczenia/')
        setPrzekroczs(flattenData(data.data))
        setFiltered(flattenData(data.data))
    }, [])
    

    return (
        <>
            <Filterimages {...filterProps}/>
            <main className='images-container'>
                {filtered.map(item => (
                    <div className='przekroczenie' key={item.id}>
                    <div className='img-section'>
                        <img className='top-content' src={`${item.zdjecie}`} alt=":(" height={150} />
                        <button>Pobierz zdjęcie</button>
                    </div>
                    <div className='img-section'>
                        <div className='top-content'>
                            <p><strong>Trasa: </strong>{item.trasa}</p>
                            <p><strong>Data planowa: </strong>{item.timestamp.slice(0,16).replace('T', ' ')}</p>
                            <p><strong>Długość geo: </strong>{item.dlugosc_geo}</p>
                            <p><strong>Szerokość geo: </strong>{item.szerokosc_geo}</p>
                            <p><strong>Wielkość mierzona: </strong>{item.mierzona_wielkosc}</p>
                            <p><strong>Wartość: </strong>{item.wartosc}</p>
                            <p><strong>Przekroczenie: </strong>{item.czy_norma_przekroczona?"Tak":"Nie"}</p>

                        </div>
                        <button>Pobierz dane</button>
                    </div>
                </div>
                ))}

            </main>
        </>
    );
}

export default Zdjecie;
