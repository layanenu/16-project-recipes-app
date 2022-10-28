import React, { useContext } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import MyContext from '../context/MyContext';

export default function DrinkId() {
  const { drink } = useContext(MyContext);

  return (
    <div>
      <RecipeDetails />
      DrinkId
      {drink}
    </div>
  );
}
