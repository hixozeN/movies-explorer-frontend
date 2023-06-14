import './Header.css';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <div
        className='header__logo'
        onClick={() => navigate('/')}
      ></div>
      <Navigation />
    </header>
  );
};

export default Header;
