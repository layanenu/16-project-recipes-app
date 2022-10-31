import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function RecipeInProgress() {
  const { ingredientsGlobal } = useContext(MyContext);
  console.log(ingredientsGlobal);
  // const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // const getRecipesMeals = getRecipes.meals;
  // // const getRecipesDrinks = getRecipes.drinks;
  // console.log(getRecipesMeals);
  return (
    <div className="recipes-progress">
      <h1 data-testid="recipe-title">
        Title
      </h1>
      <img
        data-testid="recipe-photo"
        src=""
        alt=""
      />

      <div data-testid="recipe-category">

        dd
      </div>
      <div
        data-testid="instructions"
      >
        1
      </div>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar Receita
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar Receita
      </button>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finish
      </button>
      {ingredientsGlobal.filter((el) => typeof el === 'string' || el === '')
        .map((e, index) => (
          <label
            htmlFor={ e }
            key={ index }
            data-testid="ingredient-step"
          >
            {e}
            <input
              type="checkbox"
              id={ e }
              value={ e }
            />
          </label>
        ))}
    </div>

  );
}

export default RecipeInProgress;
