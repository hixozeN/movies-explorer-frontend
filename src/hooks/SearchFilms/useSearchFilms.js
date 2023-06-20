import { useEffect, useState } from 'react';

export function useSearchFilms({ movies, isShowData }) {
  const [sortedMovies, setSortedMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState('Для просмотра фильмов введите название фильма в строку поиска.');
  // const [lastSearchQuery, setLastSearchQuery] = useState({});

  useEffect(() => {
    if (isShowData) {
      setSortedMovies(movies);
    }
  }, [isShowData, movies]);
  
  const filterMovies = (movies, query) => {
    const { searchString, isShortMovie } = query;

    if (isShortMovie) {
      return setSortedMovies(movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) && movie.duration <= 40));
    } else {
      return setSortedMovies(movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchString.toLowerCase())));
    }
  };

  // const saveSearchQueryToSessionStorage = (searchQuery) => {
  //   sessionStorage.setItem(SESSION_STORAGE_LAST_SEARCH_QUERY, JSON.stringify(searchQuery));
  // }

  // function getSearchQueryFromLocalStorage() {
  //   const searchQuery = sessionStorage.getItem(SESSION_STORAGE_LAST_SEARCH_QUERY);
  //   if (searchQuery) {
  //     setLastSearchQuery(searchQuery);
  //   }
  // }

  const handleSearch = (searchQuery) => {
    // saveSearchQueryToSessionStorage(searchQuery);
    setLoading(true);

    filterMovies(movies, searchQuery);

    if (sortedMovies.length === 0) {
      setText('Ничего не найдено. Попробуйте поменять параметры поиска.');
    }

    if (!searchQuery.searchString) {
      setText('Введите название фильма в строку поиска.')
      setSortedMovies([]);
    }

    setTimeout(() => setLoading(false), 200);
  };
  
  return { sortedMovies, handleSearch, isLoading, text, };
};
