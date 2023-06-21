import React from 'react';
import './Movie.css';
import { useLocation } from 'react-router-dom';

const Movie = (props) => {
  const { name, duration, saved, link, onSave, movieData, onDelete } = props;
  const location = useLocation();

  return (
    <li className='movie'>
      <div className='movie__heading-wrapper'>
        <div className='movie__heading'>
          <h1 className='movie__title'>{name}</h1>
          <p className='movie__duration'>Длительность: {duration} мин.</p>
        </div>
        {location.pathname === '/saved-movies' && (
          <button
          type='button'
          className='movie__delete-button'
          onClick={() => onDelete(movieData._id)}
        />
        )}
        {location.pathname === '/movies' && saved && (
          <button
          type='button'
          className='movie__favorite-button movie__favorite-button_active'
          onClick={() => onDelete(movieData._id)}
        />
        )}
        {location.pathname === '/movies' && !saved && (
          <button
          type='button'
          className='movie__favorite-button'
          onClick={() => onSave(movieData)}
        />
        )}
      </div>
      <div className='movie__poster-wrapper'>
        <img
          className='movie__image'
          src={link}
          alt={name}
        />
      </div>
    </li>
  );
};

export default Movie;
