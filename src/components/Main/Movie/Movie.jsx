import React from 'react';
import './Movie.css';
import { useLocation } from 'react-router-dom';

const Movie = (props) => {
  const { name, duration, saved, link } = props;
  const location = useLocation();

  return (
    <li className='movie'>
      <div className='movie__heading-wrapper'>
        <div className='movie__heading'>
          <h1 className='movie__title'>{name}</h1>
          <p className="movie__duration">{duration}</p>
        </div>
        {location.pathname === '/movies'
          ? <button type='button' className={saved ? 'movie__favorite-button movie__favorite-button_active' : 'movie__favorite-button'} />
          : <button type='button' className='movie__delete-button' />
        }
        
      </div>
      <img className='movie__image' src={link} alt={name} />
    </li>
  );
};

export default Movie;
