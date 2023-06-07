import React from 'react';
import HeaderLinks from '../HeaderLinks/HeaderLinks';
import NavButtons from '../NavButtons/NavButtons';

const NavMenu = ({ isDesktop }) => {
  return (
    <>
      <HeaderLinks isDesktop={isDesktop} />
      <NavButtons />
    </>
  );
};

export default NavMenu;
