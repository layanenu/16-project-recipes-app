import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { hideSearchInput } = useContext(MyContext);

  return (
    <div>
      {hideSearchInput
      && <input type="text" data-testid="search-input" />}
    </div>
  );
}

export default SearchBar;
