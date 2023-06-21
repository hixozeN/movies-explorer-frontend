import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MovieList from './MovieList/MovieList';
import MovieSearch from './MovieSearch/MovieSearch';
import { useSearchFilms } from '../../hooks/SearchFilms/useSearchFilms';

const Main = ({ movies, savedMovies, onSave, onDelete }) => {
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
      />
      <MovieList
        movies={sortedMovies}
        savedMovies={savedMovies}
        isLoading={isLoading}
        text={text}
        onSave={onSave}
        onDelete={onDelete}
      />
      <Footer />
    </>
  );
};

export default Main;
