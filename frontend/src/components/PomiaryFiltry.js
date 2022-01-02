import React, { useState, useEffect, useContext } from 'react';
import '../styles/PomiaryFiltry.scss'
import axiosInstance from '../axios';
import { Paths, Measurements } from '../Context';

const Pomiaryfiltry = ({ setDateFrom, setDateTo, setPath, setIssueNumber, setLow, setHigh, setMeasure, setIfVal }) => {
    const { measurements, setMeasurements } = useContext(Measurements);
    const { paths, setPaths } = useContext(Paths);

    useEffect(() => {
        const fetchData = async () => {
            const types = await axiosInstance.get('filter-info/')
            // console.log(types)
            setPaths(types.data.trasy)
            setMeasurements(types.data.mierzone_wartosci)
        }
        fetchData()
    }, []);

    return (
        <section className='filter-measure'>
            <div className='filter-section dates-section'>
                <div className='filter-section dates'>
                    <div>Od:</div>
                    <input type="date" name="datef" id="datef" onChange={e => { setDateFrom(e.currentTarget.value) }} />
                </div>
                <div className='filter-section dates'>
                    <div>Do:</div>
                    <input type="date" name="datet" id="datet" onChange={e => { setDateTo(e.currentTarget.value) }} />
                </div>
            </div>

            <div className='selectors'>
                <div>
                    <input id='trasa' type="text" list="paths" placeholder='Trasa' onChange={e => { setPath(e.currentTarget.value) }} />
                    <datalist id="paths">
                        {paths.map((item, id) => (
                            <option key={id}>{item.nazwa}</option>
                        ))}
                    </datalist>
                </div>
                <div>
                    <input id='nr' type="text" list="nrs" placeholder='Nr zlecenia' onChange={e => { setIssueNumber(e.currentTarget.value) }} />
                    <datalist id="nrs">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </datalist>
                </div>
                <div>
                    <input id='przek' type="text" list="prz" placeholder='Czy przekroczenie' onChange={e => { setIfVal(e.currentTarget.value) }} />
                    <datalist id="prz">
                        <option>Tak</option>
                        <option>Nie</option>
                    </datalist>
                </div>
            </div>
            <div className='amounts'>
                <div id='pom-labels'>
                    <input id='wielkosc' type="text" list="measure" placeholder='Wielkość mierzona' onChange={e => { setMeasure(e.currentTarget.value) }} />
                    <datalist id="measure">
                        {measurements.map((item, id) => (
                            <option key={id}>{item.nazwa}</option>
                        ))}
                    </datalist>

                </div>
                <div id='pom-gt'>
                    <p>Większa niż</p>
                    <input id='cogt' type="number" onChange={e => { setLow(e.currentTarget.value) }} />
                </div>
                <div id='pom-lt'>
                    <p>Mniejsza niż</p>
                    <input id='colt' type="number" onChange={e => { setHigh(e.currentTarget.value) }} />
                </div>
            </div>
        </section>
    );
}

export default Pomiaryfiltry;
