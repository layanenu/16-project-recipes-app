import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const userEmail = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.clear();

    history.push('/');
  };

  return (
    <div>
      <Header />
      <h1 data-testid="profile-email">{userEmail}</h1>
      <Link to="/done-recipes">
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

export default Profile;
