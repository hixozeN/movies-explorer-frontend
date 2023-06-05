import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <>
      <Header />
      <div className='auth'>
        <h2 className='auth__title'>Вход</h2>
        <form
          name='register'
          className='auth__form'
        >
          <input
            type='email'
            name='email'
            minLength={6}
            placeholder='Email'
            className='auth__input'
            value={''}
            autoComplete='email'
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Пароль'
            className='auth__input'
            value={''}
            autoComplete='current-password'
            required
          />
          <button
            type='submit'
            className='auth__submit-button'
          >
            Тест
          </button>
          <Link
            to='/sign-up'
            className='auth__link'
          >
            Нет аккаунта? Зарегистрируйтесь
          </Link>
        </form>
      </div>
    </>
  );
};

export default Profile;
