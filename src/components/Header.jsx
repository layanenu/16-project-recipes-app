import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import SearchBar from './SearchBar';
import '../images/profileIcon.svg';

function Header() {
  const { hideSearchBar } = useContext(MyContext);
  const location = useLocation();

  const semBarra = location.pathname.replace('/', '');
  const semHifen = semBarra.replace('-', ' ');
  const palavra = semHifen.split(' ');
  for (let i = 0; i < palavra.length; i += 1) {
    palavra[i] = palavra[i][0].toUpperCase() + palavra[i].substr(1);
  }
  const first = palavra[0];
  const second = palavra[1];
  let frase = '';
  if (palavra[1] === undefined || palavra[1] === null) {
    frase = first;
  } else {
    frase = `${first} ${second}`;
  }
  return (
    <div>
      <div className="nosso_Header">
        <div>
          <Link to="/profile">
            <img
              src="../images/profileIcon.svg"
              alt="perfil"
              data-testid="profile-top-btn"
            />
          </Link>
        </div>
        {location.pathname !== '/profile'
        && location.pathname !== '/done-recipes'
        && location.pathname !== '/favorite-recipes'
          ? (
            <button type="button" onClick={ hideSearchBar }>
              <img
                src="../images/searchIcon.svg"
                alt="searchIcon"
                data-testid="search-top-btn"
              />
            </button>

          ) : <div />}
        <h1 data-testid="page-title">{frase}</h1>
      </div>

      <div />
      <SearchBar />
    </div>
  );
}

export default Header;
