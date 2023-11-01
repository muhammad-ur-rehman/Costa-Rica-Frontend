import React from 'react';

const SearchBox = ({ searchTerm, onSearchChange, onToggleSort, sortByPrice }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <button className="search-button" onClick={onToggleSort}>
        {sortByPrice ? 'Unsort' : 'Sort by Price'}
      </button>
    </div>
  );
};

export default SearchBox;
