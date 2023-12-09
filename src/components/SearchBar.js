import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit} className='search-bar'>
      <input
        type='text'
        placeholder='Search stables...'
        value={searchTerm}
        onChange={handleSearchInput}
      />
      <button type='submit'>Search</button>
    </form>
  );
}

export default SearchBar;
