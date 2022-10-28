import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Recipes() {
  const [apiDrink, setApiDrink] = useState([]);
  const [apiMeals, setApiMeals] = useState([]);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [categoryDrink, setCategoryDrink] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [route, setRoute] = useState('');
  const { pathname } = useLocation();
  const MAX = 12;
  const MAXCATEGORY = 5;

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

  const handleApiCategorysMeals = async () => {
    const require = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const { meals } = await require.json();
    setCategoryMeals(meals);
  };

  const handleApiCategorysDrink = async () => {
    const require = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const { drinks } = await require.json();
    setCategoryDrink(drinks);
  };

  const getApi = async (value) => {
    if (route === '/meals') {
      const require = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
      const { meals } = await require.json();
      setApiMeals(meals);
    }
    if (route === '/drinks') {
      const requireDrink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`);
      const { drinks } = await requireDrink.json();
      setApiDrink(drinks);
    }
  };

  const handleDeleteAll = () => {
    if (route === '/meals') {
      handleApiAllMeals();
    }
    if (route === '/drinks') {
      handleApiAllDrink();
    }
  };

  const handleClick = async ({ target: { value } }) => {
    setToggle(!toggle);
    if (toggle) {
      handleDeleteAll();
    }
    if (!toggle) {
      getApi(value);
    }
  };

  useEffect(() => {
    handleApiAllMeals();
    handleApiAllDrink();
    handleApiCategorysDrink();
    handleApiCategorysMeals();
  }, []);

  useEffect(() => {
    setRoute(pathname);
  }, [pathname]);

  return (
    <div>
      <div>
        {route === '/meals' ? categoryMeals?.filter((e, index) => index < MAXCATEGORY)
          .map((el, i) => (
            <button
              type="button"
              key={ i }
              data-testid={ `${el.strCategory}-category-filter` }
              value={ el.strCategory }
              onClick={ handleClick }
            >
              {el.strCategory}

            </button>
          )) : categoryDrink?.filter((x, index) => index < MAXCATEGORY)
          .map((y, i) => (
            <button
              type="button"
              key={ i }
              data-testid={ `${y.strCategory}-category-filter` }
              value={ y.strCategory }
              onClick={ handleClick }
            >
              {y.strCategory}

            </button>
          ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleDeleteAll }
        >
          All

        </button>
      </div>
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
