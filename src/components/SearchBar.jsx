import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { hideSearchInput,
    ingredient,
    food,
    name,
    letter,
    handleInput,
    handleSubmit,
    handleRadioIngredient,
    handleRadioName,
    handleRadioLetter,
  } = useContext(MyContext);

  return (
    <div>
      {hideSearchInput
      && (
        <form className="search-bar-form" onSubmit={ handleSubmit }>
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search"
            value={ food }
            onChange={ handleInput }
          />
          <label htmlFor="ingredient-search-radio">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              name="ts"
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
