import React from 'react';
import './NavPromo.css';
import { Link } from 'react-router-dom';

const NavPromo = () => {
  return (
    <nav className='promo__buttons-wrapper-promo'>
      <ul className='promo__nav-list-promo'>
        <li><Link className='promo__link promo__link_type_register' to='/signup'>Регистрация</Link></li>
        <li><Link className='promo__link promo__link_type_login' to='/signup'>Войти</Link></li>
      </ul>
    </nav>
  );
};

export default NavPromo;
