import React, { useContext, useEffect, useState } from 'react';
import './Navigation.css';
import NavMenu from './NavMenu/NavMenu';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import { DeviceContext } from '../../contexts/DeviceContext/DeviceContext';
import { useLocation } from 'react-router-dom';
import NavPromo from './NavPromo/NavPromo';
import { CurrentUserContext } from '../../contexts/CurrentUserContext/CurrentUserContext';

const Navigation = () => {
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);
  const device = useContext(DeviceContext);
  const [isDesktop, setDesktop] = useState(true);
  const { isLoggedIn } = useContext(CurrentUserContext);

  const handleMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    if (device === 'desktop') {
      setDesktop(true);
      setMenuActive(false);
    } else {
      setDesktop(false);
    }
  }, [device]);

  return (
    <>
      {(location.pathname === '/' && !isLoggedIn) ? (
        <NavPromo />
      ) : (
        <>
          {isDesktop ? (
            <NavMenu isDesktop={isDesktop} />
          ) : (
            <button
              type='button'
              className='header__burger-btn'
              onClick={handleMenu}
            />
          )}
          <BurgerMenu
            active={menuActive}
            onCloseMenu={handleMenu}
          />
        </>
      )}
    </>
  );
};

export default Navigation;
