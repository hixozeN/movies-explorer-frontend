import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MovieList from './MovieList/MovieList';
import MovieSearch from './MovieSearch/MovieSearch';

const Main = ({ movies, savedMovies }) => {
  const [searchQuery, setSearchQuery] = useState({
    searchString: '',
    isShortMovie: false,
  });
  const [sortedMovies, setSortedMovies] = useState([]);

  const handleSubmit = (e) => {
    if (!searchQuery.searchString) {
      return setSortedMovies([])
    }
    filterMovies(movies, searchQuery);
  };

  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, searchString: e.target.value });
  };

  const handleChangeCheckbox = (e) => {
    setSearchQuery({ ...searchQuery, isShortMovie: e.target.checked })
  }

  const filterMovies = (movies, searchQuery) => {
    const { searchString, isShortMovie } = searchQuery;
    if (isShortMovie) {
      return setSortedMovies(
        movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) && movie.duration <= 40)
      );
    } else {
      return setSortedMovies(
        movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchString.toLowerCase()))
      );
    }
  };

  return (
    <>
      <Header />
      <MovieSearch
        onSubmit={handleSubmit}
        onChange={handleChange}
        onChangeCheckbox={handleChangeCheckbox}
      />
      <MovieList
        movies={sortedMovies}
        savedMovies={savedMovies}
      />
      <Footer />
    </>
  );
};

export default Main;
