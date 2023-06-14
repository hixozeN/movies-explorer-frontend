import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__copyright-wrapper'>
        <p className='footer__copyright'>DungeonMaster © 2023</p>
        <ul className='footer__links'>
          <li className='footer__links-element'>
            <Link
              className='footer__link'
              to='https://practicum.yandex.ru'
              target='_blank'
              rel='noopener noreferrer'
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li className='footer__links-element'>
            <Link
              className='footer__link'
              to='https://github.com/hixozeN/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
