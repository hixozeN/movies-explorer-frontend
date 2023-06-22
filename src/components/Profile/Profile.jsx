import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import useFormAndValidation from '../../hooks/FormValidation/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext/CurrentUserContext';
import { ApiServiceContext } from '../../contexts/ApiServiceContext/ApiServiceContext';
import Preloader from '../Preloader/Preloader';

const Profile = ({ onLogout, onSubmit }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, setValues, setValid } = useFormAndValidation({
    name: currentUser.name,
    email: currentUser.email,
  });
  const { isLoading, isError, text } = useContext(ApiServiceContext);
  const [isShowSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    setValues((userData) => ({ ...userData, name: currentUser.name, email: currentUser.email }))
  }, [currentUser, setValues]);

  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setValid(false);
    }
  }, [currentUser, values, setValid])

  const handleEditButtonClick = () => {
    setShowSaveButton(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({ name: values.name, email: values.email })
    if (errors && isError) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
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
          noValidate
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
              disabled={isLoading}
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
              disabled={isLoading}
              required
            />
          </label>
          <span className='profile__span-error'>{errors.email}</span>
          <p className='profile__response-error'>
            {isError && text}
          </p>
          {isLoading && <Preloader />}
          {isShowSaveButton && !isLoading && (
            <button
              type='submit'
              className='profile__button profile__button_type_submit'
              disabled={!isValid}
            >
              Сохранить
            </button>
          )} 
          {!isShowSaveButton && !isLoading && (
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
