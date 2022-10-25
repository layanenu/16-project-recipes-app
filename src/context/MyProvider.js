import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [hideSearchInput, setHideSearchInput] = useState(false);

  const hideSearchBar = () => {
    setHideSearchInput(!hideSearchInput);
  };

  const context = useMemo(() => ({ hideSearchInput, setHideSearchInput, hideSearchBar }));

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
}.isRequired;

export default MyProvider;
