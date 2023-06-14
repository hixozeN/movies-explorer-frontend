import React from 'react';
import './NavMenu.css';
import { NavLink } from 'react-router-dom';

const NavMenu = ({ isDesktop }) => {
  return (
    <nav className='header__links'>
      <ul className='header__links-list'>
        {!isDesktop && (
          <li className='header__links-list-item'>
            <NavLink
              className={({ isActive }) => `header__link header__link_type_default ${isActive && 'header__link_active'}`}
              to='/'
            >
              Главная
            </NavLink>
          </li>
        )}
        <li className='header__links-list-item'>
          <NavLink
            className={({ isActive }) => `header__link header__link_type_default ${isActive && 'header__link_active'}`}
            to='/movies'
          >
            Фильмы
          </NavLink>
        </li>
        <li className='header__links-list-item'>
          <NavLink
            className={({ isActive }) => `header__link header__link_type_default ${isActive && 'header__link_active'}`}
            to='/saved-movies'
          >
            Сохранённые фильмы
          </NavLink>
        </li>
        <li className='header__links-list-item'>
        <NavLink
            className={({ isActive }) => `header__link header__link_type_profile ${isActive && 'header__link_active'}`}
            to='/profile'
          >
            Аккаунт
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
