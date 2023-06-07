import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthButtons = () => {
  const navigate = useNavigate();

  return (
    <div className='header__buttons-wrapper'>
      <button
        type='button'
        className='header__button'
        onClick={() => navigate('/signup')}
      >
        Регистрация
      </button>
      <button
        type='button'
        className='header__button header__button_type_black'
        onClick={() => navigate('/signin')}
      >
        Войти
      </button>
    </div>
  );
};

export default AuthButtons;
