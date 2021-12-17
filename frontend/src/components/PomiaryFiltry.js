import React from 'react';
import '../styles/PomiaryFiltry.scss'

const Pomiaryfiltry = () => {
    return (
        <section className='filter-measure'>
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
                    <input id='trasa' type="text" list="paths" placeholder='Trasa' />
                    <datalist id="paths">
                        <option>Puszcza Kampinoska</option>
                        <option>Wałbrzych</option>
                        <option>Okocim</option>
                        <option>Skierliczki</option>
                    </datalist>
                </div>
                <div>
                    <input id='nr' type="text" list="nrs" placeholder='Nr zlecenia' />
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
                    <p>C0:</p>
                    <p>pH:</p>
                    <p>Pb:</p>
                </div>
                <div id='pom-gt'>
                    <p>Większy niż</p>
                    <input id='cogt' type="number" />
                    <input id='phgt' type="number" />
                    <input id='pbgt' type="number" />
                </div>
                <div id='pom-lt'>
                    <p>Mniejszy niż niż</p>
                    <input id='colt' type="number" />
                    <input id='phlt' type="number" />
                    <input id='pblt' type="number" />
                </div>
            </div>
        </section>
    );
}

export default Pomiaryfiltry;
