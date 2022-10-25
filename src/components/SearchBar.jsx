import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { hideSearchInput } = useContext(MyContext);
  return (
    <div>
      {hideSearchInput
      && (
        <form className="search-bar-form">
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search"
          />
          <label htmlFor="ingredient-search-radio">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              name="ingredient-search-radio"
            />
            Ingredient
          </label>
          <label htmlFor="name-search-radio">
            <input
              type="radio"
              data-testid="name-search-radio"
              name="name-search-radio"
            />
            Name
          </label>
          <label htmlFor="first-letter-search-radio">
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              name="first-letter-search-radio"
            />
            Letter
          </label>
          <button
            type="submit"
            data-testid="exec-search-btn"
          >
            SEARCH
          </button>
        </form>)}
    </div>
  );
}

export default SearchBar;
