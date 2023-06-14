import React from 'react';
import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import photo from '../../../images/student.png';
import { Link } from 'react-router-dom';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <section
      className='student'
      id='student'
    >
      <SectionTitle>Студент</SectionTitle>
      <div className='student__wrapper'>
        <div className='student__info'>
          <h3 className='student__name'>Виталий</h3>
          <p className='student__job'>Фронтенд-разработчик, 30 лет</p>
          <p className='student__about'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб&#8209;разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link
            className='student__link'
            to='https://github.com/hixozeN'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </Link>
        </div>
        <img
          src={photo}
          alt='Фотография разработчика сайта'
          className='student__photo'
        />
      </div>
      <Portfolio />
    </section>
  );
};

export default AboutMe;
