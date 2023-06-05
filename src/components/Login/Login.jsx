import React from 'react';
import './Login.css';
import AuthForm from '../AuthForm/AuthForm';

const Login = ({ onLogin, onRegister }) => {
  return (
    <div className='auth'>
      <div className='auth__logo'></div>
      <h2 className='auth__title'>Рады видеть!</h2>
      <AuthForm isRegForm={false} onLogin={onLogin} onRegister={onRegister} />
    </div>
  );
};

export default Login;
