import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Recipes from './Recipes';

function Drinks() {
  const { dataDrink, showSearch } = useContext(MyContext);
  const MAX = 12;

  return (
    <div>
      <Header />
      {showSearch ? dataDrink?.filter((x, i) => i < MAX)
        .map((e, index) => (
          <Link key={ e.idDrink } to={ `/drinks/${e.idDrink}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <div data-testid={ `${index}-card-name` }>{e.strDrink}</div>
              <img
                data-testid={ `${index}-card-img` }
                src={ e.strDrinkThumb }
                alt={ e.strDrink }
              />
            </div>
          </Link>
        )) : <Recipes /> }
      <Footer />
    </div>
  );
}

export default Drinks;
