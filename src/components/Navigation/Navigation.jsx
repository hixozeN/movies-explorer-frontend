import React, { useContext, useEffect, useState } from 'react';
import './Navigation.css';
import NavMenu from './NavMenu/NavMenu';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import { DeviceContext } from '../../contexts/DeviceContext/DeviceContext';

const Navigation = () => {
  const [menuActive, setMenuActive] = useState(false);
  const device = useContext(DeviceContext);
  const [isDesktop, setDesktop] = useState(true);

  const handleMenu = () => {
    setMenuActive(!menuActive);
  }

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
      {isDesktop ? (
        <NavMenu isDesktop={isDesktop} />
      ) : (
        <button
          type='button'
          className='header__burger-btn'
          onClick={handleMenu}
        ></button>
      )}
      <BurgerMenu active={menuActive} onCloseMenu={handleMenu} />
    </>
  );
};

export default Navigation;
