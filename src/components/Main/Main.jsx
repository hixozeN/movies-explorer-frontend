import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MovieList from './MovieList/MovieList';
import MovieSearch from './MovieSearch/MovieSearch';
import { useSearchFilms } from '../../hooks/SearchFilms/useSearchFilms';

const Main = ({ movies, savedMovies, onSave, onDelete, onError, onTrailerClick }) => {
  const { sortedMovies, handleSearch, isLoading, text, } = useSearchFilms({
    movies: movies,
    isSavedPage: false,
    isMoviesPage: true,
  });

  return (
    <>
      <Header />
      <MovieSearch
        onSubmit={handleSearch}
        isLoading={isLoading}
        onError={onError}
      />
      <MovieList
        movies={sortedMovies}
        savedMovies={savedMovies}
        isLoading={isLoading}
        text={text}
        onSave={onSave}
        onDelete={onDelete}
        onTrailerClick={onTrailerClick}
      />
      <Footer />
    </>
  );
};

export default Main;
