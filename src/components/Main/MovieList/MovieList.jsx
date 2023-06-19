import React, { useContext, useEffect, useState } from 'react';
import './MovieList.css';
import Movie from '../Movie/Movie';
import { useLocation } from 'react-router-dom';
import { DeviceContext } from '../../../contexts/DeviceContext/DeviceContext';
import Preloader from '../../Preloader/Preloader';

const MovieList = ({ movies, savedMovies }) => {
  const location = useLocation();
  const device = useContext(DeviceContext);
  const [showMoreFilmsButton, setShowMoreFilmsButton] = useState(true);
  const [renderCount, setRenderCount] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const configForFilmsRender = {
      desktop: {
        renderCount: 12,
        additionalRender: 3,
      },
      tablet: {
        renderCount: 8,
        additionalRender: 2,
      },
      mobile: {
        renderCount: 5,
        additionalRender: 2,
      },
    };

    setRenderCount(configForFilmsRender[device].renderCount + configForFilmsRender[device].additionalRender * page);

    movies.length >= renderCount ? setShowMoreFilmsButton(true) : setShowMoreFilmsButton(false);

  }, [device, movies, renderCount, page]);

  const isSavedMovie = (movie) => {
    return savedMovies.reduce((acc, saved) => {
      if (saved.movieId === movie.id) {
        return true;
      }
      return acc;
    }, false);
  };

  const renderMovies = (renderCount) => {
    if (movies) {
      return movies.slice(0, renderCount).map((film) => {
        return (
          <Movie
            key={film.id}
            name={film.nameRU}
            duration={film.duration}
            link={`https://api.nomoreparties.co${film.image.url}`}
            saved={isSavedMovie(film)}
          />
        );
      });
    } else {
      return 'empty';
    }
  };

  const handleClickRenderMore = () => {
    setShowMoreFilmsButton(false);
    setLoading(true);
    setTimeout(() => {
      setShowMoreFilmsButton(true);
      setLoading(false);
      setPage((prev) => prev + 1);
    }, 500);
  };

  return (
    <main className='movies'>
      <ul className='movies__list'>{movies.length > 0 ? renderMovies(renderCount) : 'Введите название фильма'}</ul>
      <div className='movies__paggination-wrapper'>
        {showMoreFilmsButton && (
          <button
            onClick={handleClickRenderMore}
            type='button'
            className={
              location.pathname === '/movies'
                ? 'movies__show-more-button'
                : 'movies__show-more-button movies__show-more-button_type_inactive'
            }
          >
            Ещё
          </button>
        )}
        {isLoading && <Preloader />}
      </div>
    </main>
  );
};

export default MovieList;
