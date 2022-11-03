import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MyContext from '../context/MyContext';
import '../App.css';

function RecipeInProgress() {
  const { ingredientsGlobal } = useContext(MyContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [localIng, setLocalIngredients] = useState([]);
  const [measureMeals, setMesureMeals] = useState([]);
  const [measureDrinks, setMesureDrinks] = useState([]);
  const [m, setMeals] = useState();
  const [d, setDrinks] = useState();
  console.log(measureDrinks, measureMeals, m, d);
  console.log(ingredientsGlobal);

  const localIngFilter = localIng
    .filter((el) => typeof el.ingredient !== 'string' || el.ingredient !== '');
  function proccessArrayIngredient(param) {
    let existstrIngredient = true;
    const newArray = [];
    let acumulator = 1;
    while (existstrIngredient) {
      const ingredient = param[`strIngredient${acumulator}`];
      if (!ingredient) {
        existstrIngredient = false;
      } else {
        newArray.push({ ingredient, checked: false });
        acumulator += 1;
      }
    }
    setLocalIngredients(newArray);
  }

  function proccessArrayMesure(param) {
    let existstrIngredient = true;
    const newArray = [];
    let acumulator = 1;
    while (existstrIngredient) {
      const ingredient = param[`strMeasure${acumulator}`];
      if (!ingredient) {
        existstrIngredient = false;
      }
      newArray.push(ingredient);
      acumulator += 1;
    }
    setMesureDrinks(newArray.filter((y) => typeof y === 'string'));
    setMesureMeals(newArray.filter((y) => typeof y === 'string'));
  }

  const handleApiMeals = useCallback(async () => {
    const require = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await require.json();
    const ts = await meals[0];
    proccessArrayIngredient(ts);
    proccessArrayMesure(ts);
    setMeals(meals);
  }, [id]);

  const handleApiDrinks = useCallback(async () => {
    const require = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await require.json();
    const ts = await drinks[0];
    // console.log(ts);e
    proccessArrayIngredient(ts);
    proccessArrayMesure(ts);
    setDrinks(drinks);
  }, [id]);

  useEffect(() => {
    if (pathname === `/drinks/${id}/in-progress`) {
      handleApiDrinks();
    } else {
      handleApiMeals();
    }
  }, [pathname, id, handleApiDrinks, handleApiMeals]);

  const handleMarked = (e) => {
    console.log(e);
    const newLocalIng = localIng.map((el, index) => {
      if (e === index) {
        el.checked = !el.checked;
      }
      return el;
    });
    console.log(localIng);
    setLocalIngredients(newLocalIng);
    // localStorage.setItem('inProgressRecipes2', JSON.stringify(newLocalIng));
    // const myConstant = localStorage.getItem('inProgressRecipes');
    // const myMeals = myConstant.meals;
    // console.log(myMeals);
  };

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
      {localIngFilter?.map((e, index) => (
        <div key={ index }>
          <label
            htmlFor={ e.ingredient }
            className={ e.checked ? 'line' : '' }
            data-testid={ `${index}-ingredient-step` }
          >
            {e.ingredient}
            <input
              type="checkbox"
              id={ e.ingredient }
              value={ e.ingredient }
              onChange={ () => handleMarked(index) }
              checked={ e.checked }
            />
          </label>
        </div>
      ))}
    </div>

  );
}

export default RecipeInProgress;
