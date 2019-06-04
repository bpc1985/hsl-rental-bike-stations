import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';

const MainNavigation = () => (
  <header className="main-navigation">
    <div className="main-navigation__logo">
      <h1>Bike Stations</h1>
    </div>
    <nav className="main-navigation__items">
      <ul>
        <li>
          <NavLink to="/stations">Stations</NavLink>
        </li>
        <li>
          <NavLink to="/description">Description</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default MainNavigation;
