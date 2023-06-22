import React from 'react';
import './Movie.css';
import { useLocation } from 'react-router-dom';

const Movie = (props) => {
  const { name, duration, saved, link, onSave, movieData, onDelete, onTrailerClick } = props;
  const location = useLocation();

  const calculateDuration = (duration) => {
    const hours = Math.floor(duration/60);
    const minutes = Math.floor(duration % 60);
    return `${hours > 0 ? hours + 'ч ' : ''}${minutes}м`;
  }

  return (
    <li className='movie'>
      <div className='movie__heading-wrapper'>
        <div className='movie__heading'>
          <h1 className='movie__title'>{name}</h1>
          <p className='movie__duration'>{calculateDuration(duration)}</p>
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
          onClick={() => onTrailerClick(movieData)}
        />
      </div>
    </li>
  );
};

export default Movie;
