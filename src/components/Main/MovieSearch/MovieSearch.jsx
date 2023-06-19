import React from 'react';
import "./MovieSearch.css";

const MovieSearch = ({ onSubmit, onChange, onChangeCheckbox }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className='search' onSubmit={handleSubmit}>
      <input className='search__input' type="text" placeholder='Фильм' onChange={onChange} name='searchString' />
      <label className="search__label">
        <input type="checkbox" className="search__checkbox-input" name='isShortMovie' onChange={onChangeCheckbox} />
        <span className='search__checkbox-span'></span>
        <p className="search__checkbox-caption">Короткометражки</p>
      </label>
    </form>
  )
}

export default MovieSearch