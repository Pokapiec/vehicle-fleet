import React from 'react';
import '../styles/Zdjecie.scss'
import Filterimages from './FilterImages';

const Zdjecie = () => {
    return (
        <>
            <Filterimages />
            <main className='images-container'>
                <div className='przekroczenie'>
                    <div className='img-section'>
                        <img className='top-content' src="https://www.komputronik.pl/informacje/wp-content/uploads/2018/05/dron-do-700.jpg" alt=":(" height={150} />
                        <button>Pobierz zdjęcie</button>
                    </div>
                    <div className='img-section'>
                        <div className='top-content'>
                            <p><strong>Trasa:</strong> Puszcza Kampinoska</p>
                            <p><strong>Data planowa:</strong> 2021-10-12</p>
                            <p><strong>Data realizacji:</strong> -</p>
                            <p><strong>Status:</strong> Zaplanowane</p>
                            <p><strong>Pojazd:</strong> Dron</p>

                        </div>
                        <button>Pobierz zdjęcie</button>
                    </div>
                </div>
                <div className='przekroczenie'>
                    <div className='img-section'>
                        <img className='top-content' src="https://www.komputronik.pl/informacje/wp-content/uploads/2018/05/dron-do-700.jpg" alt=":(" height={150} />
                        <button>Pobierz zdjęcie</button>
                    </div>
                    <div className='img-section'>
                        <div className='top-content'>
                            <p><strong>Trasa:</strong> Puszcza Kampinoska</p>
                            <p><strong>Data planowa:</strong> 2021-10-12</p>
                            <p><strong>Data realizacji:</strong> -</p>
                            <p><strong>Status:</strong> Zaplanowane</p>
                            <p><strong>Pojazd:</strong> Dron</p>

                        </div>
                        <button>Pobierz zdjęcie</button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Zdjecie;
