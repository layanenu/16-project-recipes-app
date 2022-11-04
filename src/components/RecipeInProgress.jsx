import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MyContext from '../context/MyContext';
import '../App.css';

function RecipeInProgress() {
  const { ingredientsGlobal } = useContext(MyContext);
  const [localIng, setLocalIngredients] = useState([]);
  const [measureMeals, setMesureMeals] = useState([]);
  const [measureDrinks, setMesureDrinks] = useState([]);
  const [m, setMeals] = useState();
  const [d, setDrinks] = useState();
  const [recipesInProgress, setRecipesInProgress] = useState();
  const { id } = useParams();
  const { pathname } = useLocation();
  console.log(ingredientsGlobal, measureMeals, measureDrinks, m, d, recipesInProgress);

  const myFunction = (elemento) => {
    const myProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (myProgress === null) {
      return false;
    }

    let myArrayIngredientChecked = '';
    if (pathname.includes('meals')) {
      myArrayIngredientChecked = myProgress?.meals[id];
    } else {
      myArrayIngredientChecked = myProgress?.drinks[id];
    }
    const elementFind = myArrayIngredientChecked
      ?.find((el) => el?.ingredient === elemento);
    return elementFind?.checked;
  };

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
    setLocalIngredients(newArray
      .filter((el) => typeof el.ingredient !== 'string' || el.ingredient !== '')
      .map(({ ingredient }) => ({ ingredient, checked: myFunction(ingredient) })));
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
    const newLocalIng = localIng.map((el, index) => {
      if (e === index) {
        el.checked = !el.checked;
      }
      return el;
    });

    setLocalIngredients(newLocalIng);
    const myConstant = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { meals: {}, drinks: {} };
    console.log(localStorage.getItem('inProgressRecipes'));
    if (pathname.includes('drinks')) {
      myConstant.drinks[id] = newLocalIng;
      localStorage.setItem('inProgressRecipes', JSON.stringify(myConstant));
    } else {
      myConstant.meals[id] = newLocalIng;
      localStorage.setItem('inProgressRecipes', JSON.stringify(myConstant));
    }
  };

  useEffect(() => {
  }, [setRecipesInProgress]);

  return (
    <div className="recipes-progress">
      <h1 data-testid="recipe-title">
        Receita em progresso
      </h1>
      <img
        data-testid="recipe-photo"
        src=""
        alt=""
      />
      <h3 data-testid="recipe-category">
        Categoria da receita
      </h3>
      <div
        data-testid="instructions"
      >
        Instruções da receita
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
        Finalizar receita
      </button>
      <h5>
        Marque o ingrediente conforme você for adicionando à sua receita:
      </h5>
      {localIng?.map((e, index) => (
        <div key={ index }>
          <label
            htmlFor={ e.ingredient }
            className={ e.checked ? 'line' : '' }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ e.ingredient }
              value={ e.ingredient }
              onChange={ () => handleMarked(index) }
              checked={ myFunction(e.ingredient) }
            />
            {e.ingredient}
          </label>
        </div>
      ))}
    </div>
  );
}
export default RecipeInProgress;
