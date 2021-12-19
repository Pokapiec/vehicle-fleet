import React from 'react';
import '../styles/Navbar.scss';
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className='navbar'>
            
            <div className='nav-logo'><Link to='/'>Panel klienta</Link></div>
            <Link to='/zdj'>
                <div className='nav-btn'>Zdjęcia przekroczeń</div>
            </Link>
            <Link to='/'>
                <div className='nav-btn'>Historia zleceń</div>
            </Link>
            <Link to='/pomiary'>
                <div className='nav-btn'>Pomiary</div>
            </Link>
            <Link to='/logowanie'>
                <div className='nav-btn'>Wyloguj</div>
            </Link>
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
