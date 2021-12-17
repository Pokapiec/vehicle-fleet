import React from 'react';
import '../styles/ZleceniaFiltry.scss';

const Filters = () => {
    return (
        <section className='filter-zl'>
            <div className='filter-section dates-section'>
                <div className='filter-section labels'>
                    <div>Zaplanowane:</div>
                    <div>Zrealizowane:</div>
                </div>
                <div className='filter-section dates'>
                    <div>Od:</div>
                    <input type="date" name="" id="" />
                    <input type="date" name="" id="" />
                </div>
                <div className='filter-section dates'>
                    <div>Do:</div>
                    <input type="date" name="" id="" />
                    <input type="date" name="" id="" />
                </div>
            </div>

            <div className='filter-section path'>
                <input id='trasa' type="text" list="cars" placeholder='Wybierz trase' />
                <datalist id="cars">
                    <option>Puszcza Kampinoska</option>
                    <option>Wałbrzych</option>
                    <option>Okocim</option>
                    <option>Skierliczki</option>
                </datalist>
                <div className='checkboxes'>
                    <span>
                        <h5>Status zlecenia</h5>
                        <div>

                            <input type="checkbox" id='zaplan' />
                            <label htmlFor="zaplan">Zaplanowane</label>
                        </div>
                        <div>
                            <input type="checkbox" id='ukon' />
                            <label htmlFor="ukon">Ukończone</label>
                        </div>
                        <div>
                            <input type="checkbox" id='odwol' />
                            <label htmlFor="odwol">Odwołane</label>
                        </div>

                    </span>
                    <span>
                        <h5>Status zlecenia</h5>
                        <div>

                            <input type="checkbox" id='zaplan' />
                            <label htmlFor="zaplan">Zaplanowane</label>
                        </div>
                        <div>
                            <input type="checkbox" id='ukon' />
                            <label htmlFor="ukon">Ukończone</label>
                        </div>
                        <div>
                            <input type="checkbox" id='odwol' />
                            <label htmlFor="odwol">Odwołane</label>
                        </div>

                    </span>
                </div>
            </div>

        </section>
    );
}

export default Filters;
