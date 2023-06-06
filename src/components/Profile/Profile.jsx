import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import useFormAndValidation from '../../hooks/FormValidation/useFormValidation';

const Profile = () => {
  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation();

  return (
    <>
      <Header />
      <div className='profile'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <form
          name='profile'
          className='profile__form'
        >
          <label className='profile__label'>
            <span className='profile__input-title'>Имя</span>
            <input
              className='profile__input'
              type='text'
              name='name'
              onChange={handleChange}
              value={values.name ?? ''}
              required
            />
            <span className='profile__span-error'>test</span>
          </label>
          <p className='profile__response-error'>{!isValid && 'Пример текста ошибки с сервера.'}</p>
          <button
            type='submit'
            className={`profile__button profile__button_type_submit ${!isValid && 'profile__button_disabled'}`}
            disabled={!isValid}
          >
            Редактировать
          </button>
          <button
            type='button'
            className='profile__button profile__button_type_logout'
          >
            Выйти из аккаунта
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
