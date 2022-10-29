import React, { useContext, useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import MyContext from '../context/MyContext';
import './mealsDrinks.css';

export default function DrinkId() {
  const { recoMeals, drink, setRecoMeals } = useContext(MyContext);
  const MAX = 6;

  const handleAPI = async () => {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const JSON = await request.json();
    setRecoMeals(JSON.meals);
  };

  useEffect(() => {
    handleAPI();
  }, []);

  return (
    <div>
      <RecipeDetails />
      DrinkId
      {drink}
      <div className="carrosel">
        { recoMeals?.filter((x, i) => i < MAX)
          .map((e, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="card"
            >
              <p data-testid={ `${index}-recommendation-title` }>{ e.strMeal }</p>
              <div className="image">
                <img src={ e.strMealThumb } alt={ e.strMeal } />
              </div>
            </div>))}
      </div>
    </div>
  );
}
