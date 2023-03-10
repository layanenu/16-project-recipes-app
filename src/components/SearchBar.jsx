import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { pathname } = useLocation();

  const { hideSearchInput,
    ingredient,
    input,
    name,
    letter,
    filterFood,
    filterDrink,
    handleInput,
    handleRadioIngredient,
    handleRadioName,
    handleRadioLetter,
    setShowSearch,
    ShowSearch,
  } = useContext(MyContext);

  const handleSubmit = async (e) => {
    setShowSearch(!ShowSearch);
    e.preventDefault();
    if (pathname === '/meals') {
      await filterFood();
    }
    if (pathname === '/drinks') {
      await filterDrink();
    }
  };

  return (
    <div>
      {hideSearchInput
      && (
        <form className="search-bar-form" onSubmit={ handleSubmit }>
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search"
            value={ input }
            onChange={ handleInput }
          />
          <label htmlFor="ingredient-search-radio">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              name="ts"
              id="ingredient-search-radio"
              value={ ingredient }
              onChange={ handleRadioIngredient }

            />
            Ingredient
          </label>
          <label htmlFor="name-search-radio">
            <input
              type="radio"
              data-testid="name-search-radio"
              name="ts"
              id="name-search-radio"
              value={ name }
              onChange={ handleRadioName }
            />
            Name
          </label>
          <label htmlFor="first-letter-search-radio">
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              name="ts"
              id="first-letter-search-radio"
              value={ letter }
              onChange={ handleRadioLetter }
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
