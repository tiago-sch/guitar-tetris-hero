import React from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from 'styles/Container';
import { Nav, Navbar, NavbarLink } from 'styles/Navbar';

const Navigation = () => (
  <Header>
    <Nav>
      <Navbar>
        <NavbarLink>
          <NavLink to='/' exact={true} activeClassName='header__active-link' >Guitar Tetris Hero</NavLink>
        </NavbarLink>
        <NavbarLink>
          <NavLink to='/pitchy' activeClassName='header__active-link' >Pitchy</NavLink>
        </NavbarLink>
        <NavbarLink>
          <NavLink to='/tetris' activeClassName='header__active-link' >Tetris</NavLink>
        </NavbarLink>
      </Navbar>
    </Nav>
  </Header>
);

export default Navigation;