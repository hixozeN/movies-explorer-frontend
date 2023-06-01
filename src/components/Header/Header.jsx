import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <header className='header'>
      <div className='header__logo'></div>
      {isLoggedIn && (
        <ul className='header__links'>
          <li>
            <Link
              className='header__link header__link_active'
              to='/films'
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link
              className='header__link'
              to='/films'
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
      )}
      <div className='header__buttons-wrapper'>
        {isLoggedIn ? (
          <button
            type='button'
            className='header__button header__button_type_profile'
          >
            Аккаунт
          </button>
        ) : (
          <>
            <button
              type='button'
              className='header__button'
            >
              Регистрация
            </button>
            <button
              type='button'
              className='header__button header__button_type_black'
            >
              Войти
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
