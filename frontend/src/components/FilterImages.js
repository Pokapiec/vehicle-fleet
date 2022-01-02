import React, { useEffect, useContext } from 'react';
import '../styles/FilterImages.scss'


const Filterimages = ({ setDateFrom, setDateTo, setPath, paths }) => {
    return (
        <section className='filter-images'>
            <div className='filter-section dates-section'>
                <div className='filter-section dates'>
                    <div>Od:</div>
                    <input type="date" name="" id="" onChange={e => { setDateFrom(e.currentTarget.value) }} />
                </div>
                <div className='filter-section dates'>
                    <div>Do:</div>
                    <input type="date" name="" id="" onChange={e => { setDateTo(e.currentTarget.value) }} />
                </div>
            </div>

            <div className='selectors'>
                <div className='selector-elem'>
                    <input id='trasa-img' type="text" list="paths" placeholder='Trasa' onChange={e => { setPath(e.currentTarget.value) }} />
                    <datalist id="paths">
                        {paths.map((elem, key) => (
                            <option key={key}>{elem}</option>
                        ))}

                    </datalist>
                </div>
            </div>
        </section>
    );
}

export default Filterimages;
