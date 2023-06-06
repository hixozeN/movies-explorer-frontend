import React from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../../hooks/FormValidation/useFormValidation';
import Label from './Label/Label';

const AuthForm = ({ isRegForm, onLogin, onRegister }) => {
  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    resetForm();
    isRegForm ? onRegister() : onLogin();
  };

  return (
    <form
      name={isRegForm ? 'register' : 'login'}
      className='form'
      onSubmit={handleSubmit}
    >
      {isRegForm && (
        <Label
          title='Имя'
          name='name'
          handleChange={handleChange}
          values={values}
          errors={errors}
          minLength={2}
          maxLength={30}
        />
      )}
      <Label
        title='E-mail'
        name='email'
        handleChange={handleChange}
        values={values}
        errors={errors}
      />
      <Label
        title='Пароль'
        name='password'
        handleChange={handleChange}
        values={values}
        errors={errors}
        minLength={6}
      />
      <p className="form__response-error">{!isValid && 'Пример текста ошибки с сервера.'}</p>
      <button
        type='submit'
        className={`form__submit-button ${!isValid && 'form__submit-button_disabled'}`}
        disabled={!isValid}
      >
        {isRegForm ? 'Зарегистрироваться' : 'Войти'}
      </button>
      <p className='form__link-caption'>
        {isRegForm ? (
          <>
            Уже зарегистрированы?
            <Link
              to='/signin'
              className='form__link'
            >
              Войти
            </Link>
          </>
        ) : (
          <>
            Еще не зарегистрированы?
            <Link
              to='/signup'
              className='form__link'
            >
              Регистрация
            </Link>
          </>
        )}
      </p>
    </form>
  );
};

export default AuthForm;
