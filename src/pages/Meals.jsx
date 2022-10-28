import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Recipes from './Recipes';

function Meals() {
  const { dataFood, showSearch } = useContext(MyContext);
  const MAX = 12;

  return (
    <div>
      <Header />
      { showSearch ? dataFood?.filter((x, i) => i < MAX)
        .map((e, index) => (
          <Link key={ e.idMeal } to={ `/meals/${e.idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <div data-testid={ `${index}-card-name` }>{e.strMeal}</div>
              <img
                data-testid={ `${index}-card-img` }
                src={ e.strMealThumb }
                alt={ e.strMeal }
              />
            </div>
          </Link>
        )) : <Recipes /> }
      {/* {dataFood?.filter((x, i) => i < MAX)
        .map((e, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ e.idMeal }>
            <div data-testid={ `${index}-card-name` }>{e.strMeal}</div>
            <img
              data-testid={ `${index}-card-img` }
              src={ e.strMealThumb }
              alt={ e.strMeal }
            />
          </div>
        ))}
      <Recipes /> */}
      <Footer />
    </div>
  );
}

export default Meals;
