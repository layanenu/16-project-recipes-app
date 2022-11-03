import React, { useContext, useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import MyContext from '../context/MyContext';
import './mealsDrinks.css';

export default function MealId() {
  const { recoDrinks, setRecoDrinks } = useContext(MyContext);
  const MAX = 6;

  const handleAPI = async () => {
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const JSON = await request.json();
    setRecoDrinks(JSON.drinks);
  };

  useEffect(() => {
    handleAPI();
  }, []);

  return (
    <div>
      <RecipeDetails />
      <div className="carrosel">
        { recoDrinks?.filter((x, i) => i < MAX)
          .map((e, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="card"
            >
              <p data-testid={ `${index}-recommendation-title` }>{ e.strDrink }</p>
              <div className="image">
                <img src={ e.strDrinkThumb } alt={ e.strDrink } />
              </div>
            </div>))}
      </div>
    </div>
  );
}
