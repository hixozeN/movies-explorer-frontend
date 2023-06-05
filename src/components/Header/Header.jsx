import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className='header'>
      <div
        className='header__logo'
        onClick={() => navigate('/')}
      ></div>
      {(isLoggedIn || location.pathname === '/profile' || location.pathname === '/movies') && (
        <ul className='header__links'>
          <li>
            <Link
              className='header__link header__link_active'
              to='/movies'
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link
              className='header__link'
              to='/saved-movies'
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
      )}
      <div className='header__buttons-wrapper'>
        {isLoggedIn || location.pathname === '/profile' || location.pathname === '/movies' ? (
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
