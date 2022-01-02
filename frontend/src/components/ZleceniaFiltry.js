import React from 'react';
import '../styles/ZleceniaFiltry.scss';

const Filters = ({ setDateFromP, setDateFromR, setDateToP, setDateToR, setPath, setZapl, setUkonczone, setDron, setLodka }) => {

    // const changeAndSet = (e, setFunc) => {
    //     // setFunc(e.currentTarget.checked)
        
    //     // if (e.currentTarget.checked)
    //     //     e.currentTarget.checked = 0
    //     // else 
    //     //     e.currentTarget.checked = 1
    //     console.log(e.currentTarget.defaultChecked)
    // }

    return (
        <section className='filter-zl'>
            <div className='filter-section dates-section'>
                <div className='filter-section labels'>
                    <div>Zaplanowane:</div>
                    <div>Zrealizowane:</div>
                </div>
                <div className='filter-section dates'>
                    <div>Od:</div>
                    <input type="date" name="" id="" onChange={e => { setDateFromP(e.currentTarget.value) }} />
                    <input type="date" name="" id="" onChange={e => { setDateFromR(e.currentTarget.value) }} />
                </div>
                <div className='filter-section dates'>
                    <div>Do:</div>
                    <input type="date" name="" id="" onChange={e => { setDateToP(e.currentTarget.value) }} />
                    <input type="date" name="" id="" onChange={e => { setDateToR(e.currentTarget.value) }} />
                </div>
            </div>

            <div className='filter-section path'>
                <input id='trasa' type="text" list="cars" placeholder='Wybierz trase' onChange={e => { setPath(e.currentTarget.value) }} />
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

                            <input type="checkbox" id='zaplan' onChange={e => { setZapl(e.currentTarget.checked) }} defaultChecked/>
                            <label htmlFor="zaplan">Zaplanowane</label>
                        </div>
                        <div>
                            <input type="checkbox" id='ukon' onChange={e => { setUkonczone(e.currentTarget.checked) }} defaultChecked/>
                            <label htmlFor="ukon">Ukończone</label>
                        </div>
                    </span>
                    <span>
                        <h5>Pojazd</h5>
                        <div>

                            <input type="checkbox" id='dron' onChange={e => setDron(e.currentTarget.checked)} defaultChecked/>
                            <label htmlFor="dron">Dron</label>
                        </div>
                        <div>
                            <input type="checkbox" id='lodka' onChange={e => { setLodka(e.currentTarget.checked) }} defaultChecked/>
                            <label htmlFor="lodka">Łódka</label>
                        </div>
                    </span>
                </div>
            </div>

        </section>
    );
}

export default Filters;
