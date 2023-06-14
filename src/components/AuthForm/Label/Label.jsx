import React from 'react';
import './Label.css';

const Label = ({ title, name, values, handleChange, errors, minLength, maxLength }) => {
  return (
    <label className='label'>
          <span className='label__input-name'>{title}</span>
          <input
            type={name}
            name={name}
            minLength={minLength || null}
            maxLength={maxLength || null}
            placeholder=''
            className='label__input'
            value={values[`${name}`] ?? ''}
            autoComplete={name}
            onChange={handleChange}
            required
          />
          <span className='label__span-error'>{errors[`${name}`]}</span>
        </label>
  )
}

export default Label