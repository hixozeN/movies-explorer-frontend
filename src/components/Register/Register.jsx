import React from 'react';
import './Register.css';
import AuthForm from '../AuthForm/AuthForm';

const Register = ({ onLogin, onRegister }) => {
  return (
    <div className='auth'>
      <div className='auth__logo'></div>
      <h2 className='auth__title'>Добро пожаловать!</h2>
      <AuthForm isRegForm={true} onLogin={onLogin} onRegister={onRegister} />
    </div>
  );
};

export default Register;
