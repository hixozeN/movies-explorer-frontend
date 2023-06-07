import React from 'react';
import './Navigation.css';
import { useLocation } from 'react-router-dom';
import AuthButtons from './AuthButtons/AuthButtons';
import NavMenu from './NavMenu/NavMenu';
import BurgerMenu from './BurgerMenu/BurgerMenu';

const Navigation = () => {
  const location = useLocation();

  const isPromoPage = location.pathname === '/';

  return (
    <>
      {/* {isPromoPage ? <AuthButtons /> : <NavMenu />} */}
      <BurgerMenu />
    </>
  );
};

export default Navigation;
