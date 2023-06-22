import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MovieList from '../Main/MovieList/MovieList';
import MovieSearch from '../Main/MovieSearch/MovieSearch';
import { useSearchFilms } from '../../hooks/SearchFilms/useSearchFilms';

const SavedMovies = ({ isLoggedIn, movies, onDelete, onError, onTrailerClick }) => {
  const { sortedMovies, handleSearch, isLoading, text } = useSearchFilms({
    movies: movies,
    isSavedPage: true,
  });

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <MovieSearch
        onSubmit={handleSearch}
        movies={sortedMovies}
        onError={onError}
      />
      <MovieList
        movies={sortedMovies}
        savedMovies={sortedMovies}
        isLoading={isLoading}
        text={text}
        onDelete={onDelete}
        onTrailerClick={onTrailerClick}
      />
      <Footer />
    </>
  );
};

export default SavedMovies;
