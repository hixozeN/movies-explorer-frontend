import React from 'react';
import './NavTab.css';
import { Link } from 'react-scroll';

const NavTab = () => {
  return (
    <nav className='nav-tab'>
          <ul className='nav-tab__links'>
            <li><Link className='nav-tab__link' to='about'>О проекте</Link></li>
            <li><Link className='nav-tab__link' to='techs'>Технологии</Link></li>
            <li><Link className='nav-tab__link' to='student'>Студент</Link></li>
          </ul>
        </nav>
  )
}

export default NavTab