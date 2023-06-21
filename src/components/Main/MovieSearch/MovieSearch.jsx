import React, { useEffect, useState } from 'react';
import './MovieSearch.css';
import { useLocation } from 'react-router-dom';
import { LOCAL_STORAGE_LAST_SEARCH_QUERY } from '../../../utils/globalVars';

const MovieSearch = ({ onSubmit, isLoading, onError }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState({
    searchString: '',
    isShortMovie: false,
  });

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem(LOCAL_STORAGE_LAST_SEARCH_QUERY)) {
      const { searchString, isShortMovie } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LAST_SEARCH_QUERY));
      setSearchQuery({
        searchString, isShortMovie
      });
      
    }
  }, [location])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.searchString.trim()) {
      onError();
      return setSearchQuery({ ...searchQuery, searchString: '' });
    }
    onSubmit(searchQuery);
  };

  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, searchString: e.target.value });
  };

  const handleChangeCheckbox = (e) => {
    if (!searchQuery.searchString.trim()) {
      onError();
      return setSearchQuery({ ...searchQuery, searchString: '' });
    }
    setSearchQuery({ ...searchQuery, isShortMovie: e.target.checked });
    onSubmit({ ...searchQuery, isShortMovie: e.target.checked, });
  };

  return (
    <form
      className='search'
      onSubmit={handleSubmit}
    >
      <input
        className='search__input'
        type='text'
        placeholder='Фильм'
        onChange={handleChange}
        name='searchString'
        disabled={isLoading}
        value={searchQuery.searchString}
      />
      <label className='search__label'>
        <input
          type='checkbox'
          className='search__checkbox-input'
          name='isShortMovie'
          onChange={handleChangeCheckbox}
          checked={searchQuery.isShortMovie}
          disabled={isLoading}
        />
        <span className='search__checkbox-span'></span>
        <p className='search__checkbox-caption'>Короткометражки</p>
      </label>
    </form>
  );
};

export default MovieSearch;
