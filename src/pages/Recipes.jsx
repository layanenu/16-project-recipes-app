import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Recipes() {
  const [apiDrink, setApiDrink] = useState([]);
  const [apiMeals, setApiMeals] = useState([]);
  const [route, setRoute] = useState('');
  const { pathname } = useLocation();
  const MAX = 12;

  const handleApiAllDrink = async () => {
    const require = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await require.json();
    setApiDrink(drinks);
  };

  const handleApiAllMeals = async () => {
    const require = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await require.json();
    setApiMeals(meals);
  };

  useEffect(() => {
    handleApiAllMeals();
    handleApiAllDrink();
  }, []);

  useEffect(() => {
    setRoute(pathname);
  }, [pathname]);

  return (
    <div>
      {route === '/meals' ? apiMeals?.filter((x, i) => i < MAX)
        .map((e, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ e.idMeal }>
            <div data-testid={ `${index}-card-name` }>{e.strMeal}</div>
            <img
              data-testid={ `${index}-card-img` }
              src={ e.strMealThumb }
              alt={ e.strMeal }
            />
          </div>
        )) : apiDrink?.filter((x, i) => i < MAX)
        .map((e, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ e.idDrink }>
            <div data-testid={ `${index}-card-name` }>{e.strDrink}</div>
            <img
              data-testid={ `${index}-card-img` }
              src={ e.strDrinkThumb }
              alt={ e.strDrink }
            />
          </div>
        ))}
    </div>
  );
}
