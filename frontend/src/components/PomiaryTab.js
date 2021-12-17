import React from 'react';
import '../styles/PomiaryTab.scss'

const Pomiarytab = () => {
    return (
        <div>
            <table>
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
            <div id='exports'>
                <button>Export XLSX</button>
                <button>Export XML</button>
                <button>Export JSON</button>
            </div>
        </div>
    );
}

export default Pomiarytab;
