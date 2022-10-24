import React from 'react';
import { useLocation } from 'react-router-dom';
import '../images/profileIcon.svg';

function Header() {
  const location = useLocation();
  return (
    // {location.pathname.includes('/meals/:12345')
    <div>
      <img src="../images/profileIcon.svg" alt="perfil" data-testid="profile-top-btn" />
      {location.pathname !== '/profile'
      && location.pathname !== '/done-recipes'
      && location.pathname !== '/favorite-recipes'
        ? (
          <img
            src="../images/searchIcon.svg"
            alt="searchIcon"
            data-testid="search-top-btn"
          />) : <div />}
      <h1 data-testid="page-title">{location.pathname.replace('/', '')}</h1>
    </div>
  );
}

export default Header;
