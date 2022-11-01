import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import '../images/drinkIcon.svg';

function Footer() {
  // const history = useHistory();
  // const moveToDrinks = () => {
  //   history.push('/drinks');
  // };

  // const moveToMeals = () => {
  //   history.push('/meals');
  // };

  return (
    <div
      className="footer"
      data-testid="footer"
    >
      Aqui é o footer
      <div className="drinks">
        <Link to="/drinks">
          <img
            src="../images/drinkIcon.svg"
            alt="drinks"
            data-testid="drinks-bottom-btn"
          />
        </Link>
      </div>

      <div className="meals">

        <Link to="/meals">

          <img
            data-testid="meals-bottom-btn"
            src="../images/mealIcon.svg"
            alt="meals"
          />

        </Link>
      </div>
    </div>
  );
}

export default Footer;
