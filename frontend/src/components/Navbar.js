import React, { useContext, useEffect } from 'react';
import { Authenticated } from '../Context';
import '../styles/Navbar.scss';
import { Link } from "react-router-dom";


const Navbar = () => {
    const { loggedIn, setloggedIn } = useContext(Authenticated);
    const logout = () => {
        setloggedIn(false)
        localStorage.setItem('loggedIn', false)
        localStorage.setItem('czy_naukowiec', 'false')
    }
    // useEffect(() => {
    //     console.log('Czy naukowiec')
    //     console.log(localStorage.getItem('czy_naukowiec'))
    // }, [loggedIn])
    return (
        <nav className='navbar'>
            <div className='nav-logo'><Link to='/'>Panel klienta</Link></div>
            <Link to='/zdj'>
                <div className='nav-btn'>Zdjęcia przekroczeń</div>
            </Link>
            <Link to='/'>
                <div className='nav-btn'>Historia zleceń</div>
            </Link>
            {localStorage.getItem('czy_naukowiec') == 'true'
                &&
                <Link to='/pomiary'>
                    <div className='nav-btn'>Pomiary</div>
                </Link>
            }
            {loggedIn ?
                <Link to='/' onClick={logout}>
                    <div className='nav-btn'>Wyloguj</div>
                </Link> :
                <Link to='/'>
                    <div className='nav-btn'>Zaloguj</div>
                </Link>
            }
        </nav>
    );
}

export default Navbar;


// import styled from 'styled-components';

// const Nav = styled.nav`
//     display: flex;
//     width: full;
//     background-color: #2B2E4A;
//     color: #FFF;
//     height: 60px;
// `;
