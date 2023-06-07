import React from 'react';
import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();
  return (
    <div className='auth'>
      <div onClick={() => navigate('/')} className='auth__logo'></div>
      <h2 className='auth__title'>Рады видеть!</h2>
      <AuthForm isRegForm={false} onLogin={onLogin} onRegister={onRegister} />
    </div>
  );
};

export default Login;
