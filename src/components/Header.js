import React from 'react';

import { Link } from "react-router-dom";

const Header = () => (
  <header className='header'>
    <nav className='header__nav container'>
      <Link to='/' className='header__title'>Guitar Tetris Hero</Link>
      <ul className='header__navbar'>
        <li className='header__nav-link'>
          <Link to='/pitchy'>Pitchy</Link>
        </li>
        <li className='header__nav-link'>
          <Link to='/tetris'>Tetris</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;