import React, { useState } from 'react';
import './MovieSearch.css';

const MovieSearch = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState({
    searchString: '',
    isShortMovie: false,
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchQuery);
  };

  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, searchString: e.target.value });
  };

  const handleChangeCheckbox = (e) => {
    setSearchQuery({ ...searchQuery, isShortMovie: e.target.checked });
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
      />
      <label className='search__label'>
        <input
          type='checkbox'
          className='search__checkbox-input'
          name='isShortMovie'
          onChange={handleChangeCheckbox}
        />
        <span className='search__checkbox-span'></span>
        <p className='search__checkbox-caption'>Короткометражки</p>
      </label>
    </form>
  );
};

export default MovieSearch;
