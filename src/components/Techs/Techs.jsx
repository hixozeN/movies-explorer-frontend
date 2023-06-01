import React from 'react';
import './Techs.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import { techs } from '../../data/techsData';

const Techs = () => {
  return (
    <section className='techs' id='techs'>
      <SectionTitle>Технологии</SectionTitle>
      <article className='techs__content'>
        <h4 className='techs__article-title'>7 технологий</h4>
        <p className='techs__article-caption'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className='techs__tech-list'>
          {techs.map((tech) => {
            return <li key={tech} className='techs__tech-element'>{tech}</li>;
          })}
        </ul>
      </article>
    </section>
  );
};

export default Techs;
