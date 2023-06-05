import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MovieList from '../Main/MovieList/MovieList';
import MovieSearch from '../Main/MovieSearch/MovieSearch';

const SavedMovies = ({ isLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <MovieSearch />
      <MovieList />
      <Footer />
    </>
  );
};

export default SavedMovies;
