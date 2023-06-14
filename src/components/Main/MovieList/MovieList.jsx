import React, { useContext, useEffect, useState } from 'react';
import './MovieList.css';
import { films } from '../../../data/filmsData';
import Movie from '../Movie/Movie';
import { useLocation } from 'react-router-dom';
import { DeviceContext } from '../../../contexts/DeviceContext/DeviceContext';
import Preloader from '../../Preloader/Preloader';

const MovieList = () => {
  const location = useLocation();
  const device = useContext(DeviceContext);
  const [movies, setMovies] = useState(films);
  const [showMoreFilmsButton, setShowMoreFilmsButton] = useState(true);
  const [firstRenderCount, setFirstRenderCount] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const calcFilmsToRender = (device) => {
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
          additionalRender: 1,
        },
      };

      return (
        configForFilmsRender[device].renderCount +
        configForFilmsRender[device].additionalRender * page
      );
    };

    setFirstRenderCount(calcFilmsToRender(device));

    if (movies.length <= calcFilmsToRender(device)) setShowMoreFilmsButton(false);
  }, [device, movies, page]);

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
      <ul className='movies__list'>
        {location.pathname === '/movies'
          ? movies.slice(0, firstRenderCount).map((film) => {
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
          : movies
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
