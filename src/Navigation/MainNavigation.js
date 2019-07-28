import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './MainNavigation.css';
import steam_login from './steam_login.png';
import AuthContext from '../context/auth-context';

const MainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>Item Trade </h1>
          </div>
          <nav className="main-navigation__items">
            <ul>
              <li>{context.token && <NavLink to="/trade">Trade</NavLink>}</li>
              <li>
                {context.token && <NavLink to="/inventory">Inventory</NavLink>}
              </li>
              <li>
                {!context.token && (
                  <button
                    variant="link"
                    style={{ background: 'transparent' }}
                    onClick={props.steam_signin}
                  >
                    <img src={steam_login} />
                  </button>
                )}
              </li>
              {context.token && (
                <Button variant="danger" onClick={context.logout}>
                  Logout
                </Button>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default MainNavigation;
