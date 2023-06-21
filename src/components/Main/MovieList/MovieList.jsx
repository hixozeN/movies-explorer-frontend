import React, { useContext, useEffect, useState } from 'react';
import './MovieList.css';
import Movie from '../Movie/Movie';
import { useLocation } from 'react-router-dom';
import { DeviceContext } from '../../../contexts/DeviceContext/DeviceContext';
import Preloader from '../../Preloader/Preloader';
import { BEAT_API_URL } from '../../../utils/globalVars';
import SearchMessage from '../SearchMessage/SearchMessage';

const MovieList = ({ movies, savedMovies, isLoading, text, onSave, onDelete }) => {
  const location = useLocation();
  const device = useContext(DeviceContext);
  const [showMoreFilmsButton, setShowMoreFilmsButton] = useState(true);
  const [renderCount, setRenderCount] = useState(0);
  const [page, setPage] = useState(0);
  const [isPagginationLoading, setPagginationLoading] = useState(false);

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

    setRenderCount(
      configForFilmsRender[device].renderCount +
        configForFilmsRender[device].additionalRender * page
    );

    movies.length >= renderCount ? setShowMoreFilmsButton(true) : setShowMoreFilmsButton(false);
  }, [device, movies, renderCount, page]);

  const isSavedMovie = (movie) => {
    return savedMovies.reduce((acc, saved) => {
      if (saved.movieId === movie.id) {
        movie._id = saved._id;
        return true;
      }
      return acc;
    }, false);
  };

  const getImageLink = (movie) => {
    return movie.movieId
      ? movie.image
      : BEAT_API_URL + movie.image.url
  }

  const getMovieId = (movie) => {
    return movie.movieId
      ? movie.movieId
      : movie.id
  }

  const renderMovies = (renderCount) => {
    if (movies.length > 0) {
      return movies.slice(0, renderCount).map((film) => {
        return (
          // убрать лишние пропсы, сделать деструктуризацию от movieData внутри компонента
          <Movie
            key={getMovieId(film)}
            name={film.nameRU}
            duration={film.duration}
            link={getImageLink(film)}
            saved={isSavedMovie(film)}
            movieData={film}
            onSave={onSave}
            onDelete={onDelete}
          />
        );
      });
    }
  };

  const handleClickRenderMore = () => {
    setShowMoreFilmsButton(false);
    setPagginationLoading(true);
    setTimeout(() => {
      setShowMoreFilmsButton(true);
      setPagginationLoading(false);
      setPage((prev) => prev + 1);
    }, 200);
  };

  return (
    <main className='movies'>
      {movies.length === 0 && <SearchMessage>{text}</SearchMessage>}
      <ul className='movies__list'>{isLoading ? <Preloader /> : renderMovies(renderCount)}</ul>
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
        {isPagginationLoading && <Preloader />}
      </div>
    </main>
  );
};

export default MovieList;
