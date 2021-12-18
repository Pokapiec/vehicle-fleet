import React from 'react';
import '../styles/FilterImages.scss'

const Filterimages = () => {
    return (
        <section className='filter-images'>
            <div className='filter-section dates-section'>
                <div className='filter-section dates'>
                    <div>Od:</div>
                    <input type="date" name="" id="" />
                </div>
                <div className='filter-section dates'>
                    <div>Do:</div>
                    <input type="date" name="" id="" />
                </div>
            </div>

            <div className='selectors'>
                <div>
                    <input id='trasa-img' type="text" list="paths" placeholder='Trasa' />
                    <datalist id="paths">
                        <option>Puszcza Kampinoska</option>
                        <option>Wałbrzych</option>
                        <option>Okocim</option>
                        <option>Skierliczki</option>
                    </datalist>
                </div>
            </div>
        </section>
    );
}

export default Filterimages;
