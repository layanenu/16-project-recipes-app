import React from 'react';
import { useHistory } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const history = useHistory();
  const moveToDrinks = () => {
    history.push('/drinks');
  };

  const moveToMeals = () => {
    history.push('/meals');
  };

  return (
    <div
      className="footer"
      data-testid="footer"
    >
      Aqui é o footer
      <div className="drinks">
        <button
          type="button"
          onClick={ moveToDrinks }
        >
          <img
            src="../images/drinkIcon.svg"
            alt="drink"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </div>

      <div className="meals">
        <button
          type="button"
          onClick={ moveToMeals }
        >
          <img
            data-testid="meals-bottom-btn"
            src="../images/mealIcon.svg"
            alt="meals"
          />
        </button>
      </div>
    </div>
  );
}

export default Footer;
