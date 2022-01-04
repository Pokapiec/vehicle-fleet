import React, { useEffect, useState, useContext } from 'react';
import '../styles/ZlecenieDetale.scss'
import { useLocation } from 'react-router-dom'
import axiosInstance from '../axios.js';
import { Measurements } from '../Context';


const Zleceniedetale = () => {
    const { measurements, setMeasurements } = useContext(Measurements);

    const [details, setdetails] = useState({});
    const [tabData, setTabData] = useState([]);
    const [przekroczenia, setPrzekroczenia] = useState([]);

    const loc = useLocation()

    const flattenData = (data) => {
        let arr = []
        data.forEach(elem => {
            elem.czujniki.forEach(inner => {
                delete elem.czujniki
                arr.push({ ...elem, ...inner })
            })
        })
        return arr
    }
    const flattenPrzek = (data) => {
        let arr = []
        data.forEach(elem => {
            let pom = { ...elem }
            let przekroczenia = []
            elem.czujniki.forEach(inner => {
                pom[inner.mierzona_wielkosc] = inner.wartosc
                pom[inner.mierzona_wielkosc] = inner.wartosc
                if (inner.czy_norma_przekroczona) {
                    przekroczenia.push(inner.mierzona_wielkosc)
                }
            })
            pom['przekroczenie'] = przekroczenia.join(', ')
            arr.push(pom)
        })
        return arr
    }
    const getTypesFromData = (data) => {
        const types = []
        data.forEach(item => {
            item.czujniki.forEach(elem => {
                if (!types.includes(elem.mierzona_wielkosc))
                    types.push(elem.mierzona_wielkosc)
            })
        })
        return types
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await axiosInstance.get(`zlecenia/${loc.state}/`)
            console.log(data)
            setdetails(data.data)
            const tab = flattenData(data.data.pomiary)
            tab.sort((a, b) => (a.id > b.id) ? 1 : -1)
            setTabData(tab)
            setPrzekroczenia(flattenPrzek(data.data.przekroczenia))
            setMeasurements(getTypesFromData(data.data.przekroczenia))
        }
        fetchData()
    }, [])
    return (
        <div className='zlecenie-detale'>
            <h1>Zlecenie {details.id}</h1>
            <div className='zl-info'>
                <p><strong>Trasa: </strong>{details.trasa}</p>
                <p><strong>Data planowa: </strong>{details.planowana_data_realizacji}</p>
                <p><strong>Data rozpoczęcia: </strong>{details.rozpoczecie_realizacji}</p>
                <p><strong>Data realizacji: </strong>{details.koniec_realizacji}</p>
                {/* <p><strong>Status: </strong>Zaplanowane</p> */}
                <p><strong>Pojazd: </strong>{details.typ_pojazdu === 'D' ? "Dron" : "Łódka"}</p>

            </div>
            {tabData.length != 0 &&
                <div className='pom-info'>
                    <h2 className='pom-title'>Pomiary</h2>
                    <table className='pomiary-tab'>
                        <thead>
                            <tr>
                                <th>Nr zlecenia</th>
                                <th>timestamp</th>
                                <th>Szerokość geo</th>
                                <th>Długość geo</th>
                                <th>Wielkość</th>
                                <th>Wartość</th>
                                <th>Przekroczenie</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.timestamp ? item.timestamp.slice(0, 16).replace('T', ' ') : "Niezdefiniowany"}</td>
                                    <td>{item.szerokosc_geo}</td>
                                    <td>{item.dlugosc_geo}</td>
                                    <td>{item.mierzona_wielkosc}</td>
                                    <td>{item.wartosc}</td>
                                    <td>{item.czy_norma_przekroczona ? "Tak" : "Nie"}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            }

            {przekroczenia.length != 0 &&
                <div className='img-info'>
                    <h2 className='pom-title'>Zdjęcia przekroczeń</h2>
                    {przekroczenia.map(item => (
                        <div className='img-info-container' key={item.id}>
                            <img src={`${item.zdjecie}`} alt=":(" width={250} />
                            <div>
                                <p><strong>Trasa: </strong>{item.trasa}</p>
                                <p><strong>Data: </strong> {item.timestamp ? item.timestamp.slice(0, 16).replace('T', ' ') : "Niezdefiniowany"}</p>
                                <p><strong>Szerokość geo: </strong>{item.szerokosc_geo}</p>
                                <p><strong>Dlugość: </strong>{item.dlugosc_geo}</p>
                                {measurements.map((elem, key) => (
                                    <p className={`${item.przekroczenie === elem?"warning":""}`} key={key}><strong>{elem}: </strong>{item[elem]}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            }

            {details.nagranie &&
                <div className='vid-info'>
                    <h2>Nagranie z przelotu</h2>
                    <iframe width="560" controls="2" height="315" title="Drone video" src={`${details.nagranie.replace('watch?v=', 'embed/')}?autoplay=0&showinfo=0&autohide=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            }
        </div>
    );
}

export default Zleceniedetale;
