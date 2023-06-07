import './Header.css';
import { useNavigate } from 'react-router-dom';
import HeaderLinks from './HeaderLinks/HeaderLinks';

const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <div
        className='header__logo'
        onClick={() => navigate('/')}
      ></div>
      {isLoggedIn && <HeaderLinks />}
      <div className='header__buttons-wrapper'>
        {isLoggedIn ? (
          <button
            type='button'
            className='header__button header__button_type_profile'
            onClick={() => navigate('/profile')}
          >
            Аккаунт
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
