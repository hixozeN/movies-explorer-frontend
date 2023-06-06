import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';

const Promo = () => {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>Учебный проект студента факультета&nbsp;Веб-разработки.</h1>
        <NavTab />
      </div>
    </section>
  );
};

export default Promo;
