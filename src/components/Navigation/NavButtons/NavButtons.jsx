import { useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext/CurrentUserContext';
import { useNavigate } from 'react-router-dom';

const NavButtons = () => {
  const currentUser = useContext(CurrentUserContext);
  const { isLoggedIn } = currentUser;
  const navigate = useNavigate();

  return (
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
  );
};

export default NavButtons;
