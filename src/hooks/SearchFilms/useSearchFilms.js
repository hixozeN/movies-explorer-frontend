import { useState } from 'react';

export function useSearchFilms({ query, movies }) {
  const [sortedMovies, setSortedMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [text, setText] = useState('Ищи-свищи');
  const { searchString, isShortMovie } = query;

  const filterMovies = (movies) => {
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

  const handleSearch = (searchQuery) => {
    setLoading(true);

    filterMovies(movies);

    if (sortedMovies.length === 0) {
      setText('Ничего не найдено.');
    }

    setTimeout(() => setLoading(false), 200);
  };
  
  return { sortedMovies, handleSearch, isLoading, text, };
};
