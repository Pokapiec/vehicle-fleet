import React from 'react';
import '../styles/Navbar.scss';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='nav-logo'>Panel klienta</div>
            <div className='nav-btn'>Zdjęcia przekroczeń</div>
            <div className='nav-btn'>Historia zleceń</div>
            <div className='nav-btn'>Pomiary</div>
            <div className='nav-btn'>Wyloguj</div>
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
