import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './MainNavigation.css';

const MainNavigation = props => (
  <header className="main-navigation">
    <div className="main-navigation__logo">
      <h1>Item Trade </h1>
    </div>
    <nav className="main-navigation__items">
      <ul>
        <li>
        </li>

        <li>
          <NavLink to="/inventory">Inventory</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default MainNavigation;
