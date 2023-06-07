import React from 'react';
import { NavLink } from 'react-router-dom';
import { headerLinks } from '../../../data/headerLinks';
import './HeaderLinks.css';

const HeaderLinks = () => {
  return (
    <nav className='header__links'>
        {headerLinks.map((item) => {
          return (
            <li key={item.link}>
              <NavLink
                className={({ isActive }) => `header__link ${isActive && 'header__link_active'}`}
                to={item.link}
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
    </nav>
  );
};

export default HeaderLinks;
