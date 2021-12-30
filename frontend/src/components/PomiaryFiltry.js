import React, { useState, useEffect } from 'react';
import '../styles/PomiaryFiltry.scss'

const Pomiaryfiltry = ({ setDateFrom, setDateTo, setPath, setIssueNumber, setLow, setHigh }) => {

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
                        <option>Puszcza Kampinoska</option>
                        <option>Wałbrzych</option>
                        <option>Okocim</option>
                        <option>Skierliczki</option>
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
            </div>
            <div className='amounts'>
                <div id='pom-labels'>
                    <p>Wartość mierzona:</p>

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
