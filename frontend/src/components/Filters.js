import React from 'react';
import '../styles/Filters.scss';

const Filters = () => {
    return (
        <section>
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
                <div>Od:</div>
                <input type="date" name="" id="" />
                <input type="date" name="" id="" />
            </div>
            <div className='filter-section path'>
                <input id='trasa' type="text" list="cars" placeholder='Trasa'/>
                <datalist id="cars">
                    <option>Volvo</option>
                    <option>Saab</option>
                    <option>Mercedes</option>
                    <option>Audi</option>
                </datalist>
                <div className='checkboxes'>
                    <span>
                        <h5>Status zlecenia</h5>
                        <div>

                            <input type="checkbox" id='zaplan' />
                            <label for="zaplan">Zaplanowane</label>
                        </div>
                        <div>
                            <input type="checkbox" id='ukon' />
                            <label for="ukon">Ukończone</label>
                        </div>
                        <div>
                            <input type="checkbox" id='odwol' />
                            <label for="odwol">Odwołane</label>
                        </div>

                    </span>
                    <span>
                        <h5>Status zlecenia</h5>
                        <div>

                            <input type="checkbox" id='zaplan' />
                            <label for="zaplan">Zaplanowane</label>
                        </div>
                        <div>
                            <input type="checkbox" id='ukon' />
                            <label for="ukon">Ukończone</label>
                        </div>
                        <div>
                            <input type="checkbox" id='odwol' />
                            <label for="odwol">Odwołane</label>
                        </div>

                    </span>
                </div>
            </div>

        </section>
    );
}

export default Filters;
