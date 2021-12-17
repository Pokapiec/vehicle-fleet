import React from 'react';
import '../styles/Zlecenia.scss';
import { Link } from "react-router-dom";

const Zlecenia = () => {
    return (
        <main>
            <ul>
                <Link to='/zlecenie/1'>
                    <li>
                        <div>
                            Zlecenie 1
                        </div>
                        <div>
                            Dron
                        </div>
                        <div>
                            21.06.2021
                        </div>
                        <div>
                            Puszcza Kampinoska
                        </div>
                        <div>
                            Zaplanowane
                        </div>
                    </li>
                </Link>
                <Link to='/zlecenie/2'>
                    <li>
                        <div>
                            Zlecenie 1
                        </div>
                        <div>
                            Dron
                        </div>
                        <div>
                            21.06.2021
                        </div>
                        <div>
                            Puszcza Kampinoska
                        </div>
                        <div>
                            Zaplanowane
                        </div>
                    </li>
                </Link>
                <Link to='/zlecenie/3'>
                    <li>
                        <div>
                            Zlecenie 1
                        </div>
                        <div>
                            Dron
                        </div>
                        <div>
                            21.06.2021
                        </div>
                        <div>
                            Puszcza Kampinoska
                        </div>
                        <div>
                            Zaplanowane
                        </div>
                    </li>
                </Link>
                <Link to='/zlecenie/3'>

                    <li>
                        <div>
                            Zlecenie 1
                        </div>
                        <div>
                            Dron
                        </div>
                        <div>
                            21.06.2021
                        </div>
                        <div>
                            Puszcza Kampinoska
                        </div>
                        <div>
                            Zaplanowane
                        </div>
                    </li>
                </Link>


            </ul>
        </main>
    );
}

export default Zlecenia;
