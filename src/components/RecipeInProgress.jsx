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
  // const history = useHistory()/;
  console.log(measureDrinks, measureMeals, m, d);
  console.log(ingredientsGlobal);
  // const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // const getRecipesMeals = getRecipes.meals;
  // // const getRecipesDrinks = getRecipes.drinks;
  // console.log(getRecipesMeals);
  const localIngFilter = localIng.filter((el) => typeof el !== 'string' || el !== '');
  console.log(localIngFilter);
  function proccessArrayIngredient(param) {
    let existstrIngredient = true;
    const newArray = [];
    let acumulator = 1;
    while (existstrIngredient) {
      const ingredient = param[`strIngredient${acumulator}`];
      if (!ingredient) {
        existstrIngredient = false;
      }

      newArray.push(ingredient);
      acumulator += 1;
    }

    // console.log(newArray);
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
    console.log('opa estou aqui', ts);
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
    console.log(localIng);
    console.log('entrou');
    if (pathname === `/drinks/${id}/in-progress`) {
      handleApiDrinks();
    } else {
      handleApiMeals();
    }
  }, [pathname, id, handleApiDrinks, handleApiMeals]);

  const handleMarked = (e) => {
    console.log(e);
    const getLabel = document.querySelectorAll('label[class=label]')[e];
    if (getLabel.style.textDecoration !== '') {
      getLabel.style.textDecoration = '';
      return;
    }
    // console.log(document.getElementById(e).classList.add('line'));
    getLabel.style.textDecoration = 'line-through solid rgb(0, 0, 0)';

    // target.className = 'line';
    // console.log(target.className);
  };

  // const toggle = () => {
  //   setChecked(!checked);
  // };

  // const handleLabel = ({ target }) => {
  //   target.className = 'line';
  // };

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
            htmlFor={ e }
            data-testid="ingredient-step"
            className="label"
          >
            {e}
            <input
              type="checkbox"
              id={ e }
              value={ e }
              onChange={ () => handleMarked(index) }
            />
          </label>
        </div>
      ))}
    </div>

  );
}

export default RecipeInProgress;
