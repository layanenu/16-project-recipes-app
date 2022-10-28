import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function RecipeDetails() {
  const [meals, setMeals] = useState();
  const [drinks, setDrinks] = useState();
  const { id } = useParams();
  const { pathname } = useLocation();

  const handleApiMeals = async () => {
    const require = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await require.json();
    setMeals(data);
  };

  const handleApiDrinks = async () => {
    const require = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await require.json();
    setDrinks(data);
  };

  useEffect(() => {
    if (pathname === `/drinks/${id}`) {
      handleApiDrinks();
    }
    handleApiMeals();
  }, []);

  console.log(id);
  return (
    <div>
      {pathname === `/drinks/${id}` ? console.log(drinks) : console.log(meals)}
    </div>
  );
}
