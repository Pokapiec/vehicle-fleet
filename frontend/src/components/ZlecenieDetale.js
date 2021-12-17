import React from 'react';
import '../styles/ZlecenieDetale.scss'

const Zleceniedetale = () => {
    return (
        <div className='zlecenie-detale'>
            <h1>Zlecenie 1</h1>
            <div className='zl-info'>
                <p><strong>Trasa:</strong> Puszcza Kampinoska</p>
                <p><strong>Data planowa:</strong> 2021-10-12</p>
                <p><strong>Data realizacji:</strong> -</p>
                <p><strong>Status:</strong> Zaplanowane</p>
                <p><strong>Pojazd:</strong> Dron</p>

            </div>
            <div className='pom-info'>
                <h2 className='pom-title'>Pomiary</h2>
                <table className='pomiary-tab'>
                    <thead>
                        <tr>
                            <th>Nr zlecenia</th>
                            <th>Trasa</th>
                            <th>timestamp</th>
                            <th>Połozenie x</th>
                            <th>Połozenie y</th>
                            <th>CO</th>
                            <th>pH</th>
                            <th>Pb</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <td>Słupsk</td>
                            <td>2021-11-12</td>
                            <td>40</td>
                            <td>75</td>
                            <td>22</td>
                            <td>34</td>
                            <td>38</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Żwirki</td>
                            <td>2021-11-13</td>
                            <td>34</td>
                            <td>27</td>
                            <td>54</td>
                            <td>44</td>
                            <td>51</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Muchomorki</td>
                            <td>2021-11-14</td>
                            <td>57</td>
                            <td>97</td>
                            <td>11</td>
                            <td>5</td>
                            <td>82</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Kościelisko</td>
                            <td>2021-11-15</td>
                            <td>95</td>
                            <td>1</td>
                            <td>51</td>
                            <td>74</td>
                            <td>57</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>San fransisko</td>
                            <td>2021-11-16</td>
                            <td>85</td>
                            <td>72</td>
                            <td>42</td>
                            <td>55</td>
                            <td>60</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='img-info'>
                <h2 className='pom-title'>Zdjęcia przekroczeń</h2>
                <div className='img-info-container'>
                    <img src="https://www.komputronik.pl/informacje/wp-content/uploads/2018/05/dron-do-700.jpg" alt=":(" height={150} />
                    <div>
                        <p><strong>Trasa:</strong> Puszcza Kampinoska</p>
                        <p><strong>Data planowa:</strong> 2021-10-12</p>
                        <p><strong>Data realizacji:</strong> -</p>
                        <p><strong>Status:</strong> Zaplanowane</p>
                        <p><strong>Pojazd:</strong> Dron</p>

                    </div>
                </div>

            </div>
            <div className='vid-info'>
                <h2>Nagranie z przelotu</h2>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/EaYYbW-P1mI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    );
}

export default Zleceniedetale;
