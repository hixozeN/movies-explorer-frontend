import React, { useContext, useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import useFormAndValidation from '../../hooks/FormValidation/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext/CurrentUserContext';

const Profile = ({ onLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange } = useFormAndValidation({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [serverResError, setServerResError] = useState(false);
  const [isShowSaveButton, setShowSaveButton] = useState(false);

  const handleEditButtonClick = () => {
    setShowSaveButton(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setServerResError(true);
  };
  return (
    <>
      <Header />
      <section className='profile'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <form
          name='profile'
          className='profile__form'
          onSubmit={handleSubmit}
        >
          <label className='profile__label'>
            <span className='profile__input-title'>Имя</span>
            <input
              className='profile__input'
              type='text'
              name='name'
              onChange={handleChange}
              onFocus={handleEditButtonClick}
              value={values.name}
              minLength={2}
              maxLength={30}
              required
            />
          </label>
          <span className='profile__span-error'>{errors.name}</span>
          <label className='profile__label'>
            <span className='profile__input-title'>E-mail</span>
            <input
              className='profile__input'
              type='email'
              name='email'
              onChange={handleChange}
              onFocus={handleEditButtonClick}
              value={values.email}
              required
            />
          </label>
          <span className='profile__span-error'>{errors.email}</span>
          <p className='profile__response-error'>
            {serverResError && 'При обновлении профиля произошла ошибка.'}
          </p>
          {isShowSaveButton ? (
            <button
              type='submit'
              className='profile__button profile__button_type_submit'
              disabled={!isValid}
            >
              Сохранить
            </button>
          ) : (
            <>
              <button
                type='button'
                className='profile__button'
                onClick={handleEditButtonClick}
              >
                Редактировать
              </button>
              <button
                type='button'
                className='profile__button profile__button_type_logout'
                onClick={onLogout}
              >
                Выйти из аккаунта
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
};

export default Profile;
