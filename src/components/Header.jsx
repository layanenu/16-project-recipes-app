import React from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';
import { useLocation, Link } from 'react-router-dom';
import '../images/profileIcon.svg';

function Header() {
  const location = useLocation();

  // Daqui pra baixo é gambiarra não me pergunte o que eu fiz aqui
  const semBarra = location.pathname.replace('/', '');
  const semHifen = semBarra.replace('-', ' ');
  const palavra = semHifen.split(' ');
  for (let i = 0; i < palavra.length; i += 1) {
    palavra[i] = palavra[i][0].toUpperCase() + palavra[i].substr(1);
  }
  console.log(palavra);
  const first = palavra[0];
  const second = palavra[1];
  let frase = '';
  if (palavra[1] === undefined || palavra[1] === null) {
    frase = first;
  } else {
    frase = `${first} ${second}`;
  }
  console.log(frase);
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

            <img
              src="../images/searchIcon.svg"
              alt="searchIcon"
              data-testid="search-top-btn"
            />
          ) : <div />}
        <h1 data-testid="page-title">{frase}</h1>
      </div>

      <div />

    </div>
  );
}

export default Header;

/*

 <div>
      {
        location.pathname === '/done-recipes'
        || location.pathname === '/favorite-recipes' || location.pathname.length > max
          ? (
            <div className="nosso_Header">
              <img
                src="../images/profileIcon.svg"
                alt="perfil"
                data-testid="profile-top-btn"
              />
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
            </div>)
          : <div />
      }
    </div>

*/
