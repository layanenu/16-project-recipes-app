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
  const [recipesInProgress, setRecipesInProgress] = useState();
  console.log(ingredientsGlobal);

  const myFunciton = (elemento) => {
    console.log(elemento);
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
    // const myArrayIngredientChecked = myProgress.meals[id];
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
      .map(({ ingredient }) => ({ ingredient, checked: myFunciton(ingredient) })));
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
    // console.log(localIng, 'localing linha 82');
    setLocalIngredients(newLocalIng);
    console.log(newLocalIng);
    const myConstant = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (pathname.includes('drinks')) {
      // const newObjIng = myConstant.drinks[id];
      myConstant.drinks[id] = newLocalIng;
      localStorage.setItem('inProgressRecipes', JSON.stringify(myConstant));
    } else {
      // const newObjIng = myConstant.meals[id];
      myConstant.meals[id] = newLocalIng;
      localStorage.setItem('inProgressRecipes', JSON.stringify(myConstant));
    }
  };
  // console.log(myFunciton(localIngFilter));
  // const localIngFilter = localIng
  //   .filter((el) => typeof el.ingredient !== 'string' || el.ingredient !== '')
  //   .map(({ ingredient }) => ({ ingredient, checked: myFunciton(ingredient) }));

  useEffect(() => {
    // setRecipesInProgress(myProgress);
  }, [setRecipesInProgress]);

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
              checked={ myFunciton(e.ingredient) }
            />
            {e.ingredient}
          </label>
        </div>
      ))}
    </div>

  );
}

export default RecipeInProgress;
