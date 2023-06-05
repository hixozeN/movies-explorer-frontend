import React from 'react';
import './MovieList.css';
import { films } from '../../../data/filmsData';
import Movie from '../Movie/Movie';
import { useLocation } from 'react-router-dom';

const MovieList = () => {
  const location = useLocation();
  return (
    <main className='movies'>
      <ul className='movies__list'>
        {location.pathname === '/movies'
          ? films.map((film) => {
              return (
                <Movie
                  key={film._id}
                  name={film.name}
                  duration={film.duration}
                  link={film.link}
                  saved={film.saved}
                />
              );
            })
          : films
              .filter((film) => film.saved)
              .map((film) => {
                return (
                  <Movie
                    key={film._id}
                    name={film.name}
                    duration={film.duration}
                    link={film.link}
                    saved={film.saved}
                  />
                );
              })}
      </ul>
        <button
          type='button'
          className={location.pathname === '/movies'
            ? 'movies__show-more-button'
            : 'movies__show-more-button movies__show-more-button_type_inactive'}
        >
          Ещё
        </button>
    </main>
  );
};

export default MovieList;
