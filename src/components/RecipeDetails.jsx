import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import './RecipeDetails.css';

const copy = require('clipboard-copy');

export default function RecipeDetails() {
  const { setIngredientsGlobal } = useContext(MyContext);
  const [m, setMeals] = useState();
  const [d, setDrinks] = useState();
  const [ingredientsMeals, setIngredientsMeals] = useState([]);
  const [ingredientsDrinks, setIngredientsDrinks] = useState([]);
  const [measureMeals, setMesureMeals] = useState([]);
  const [measureDrinks, setMesureDrinks] = useState([]);
  const [isProgressRecipe, setIsProgressRecipe] = useState(false);
  const [copied, setCopied] = useState(false);
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
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
    setIngredientsDrinks(newArray);
    setIngredientsMeals(newArray);
    setIngredientsGlobal(newArray);
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
    if (pathname === `/drinks/${id}`) {
      handleApiDrinks();
    } else handleApiMeals();
  }, [pathname, id, handleApiDrinks, handleApiMeals]);
  const listaDeIngredientesDrinks = {
    drinks: {
      [`${id}`]: ingredientsDrinks,
    },
  };
  const listaDeIngredientesMeals = {
    meals: {
      [`${id}`]: ingredientsMeals,
    },
  };
  function concactLocalStorage(objectToConcat, stringNameObject) {
    let rota = '';
    if (pathname.includes('meals')) {
      rota = 'meals';
    } else rota = 'drinks';
    let objectString = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    if (!objectString) {
      objectString = { meals: {}, drinks: {} };
    }
    objectString[rota][id] = stringNameObject === 'meals'
      ? ingredientsMeals : ingredientsDrinks;
    localStorage.setItem('inProgressRecipes', JSON.stringify(objectString));
  }
  const handleClickDrinkInProgress = () => {
    history.push(`/drinks/${id}/in-progress`);
    concactLocalStorage(listaDeIngredientesDrinks, 'inProgressRecipes');
  };
  const handleClickMealInProgress = () => {
    history.push(`/meals/${id}/in-progress`);
    concactLocalStorage(listaDeIngredientesMeals, 'inProgressRecipes');
  };

  useEffect(() => {
    const checkId = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { meals: {}, drinks: {} };
    if (pathname.includes('drinks')) {
      console.log('AQui é a drinks', checkId);
      const chaveDrink = Object.keys(checkId?.drinks);
      const resultDrink = chaveDrink.find((el) => el === id);
      if (resultDrink === id) {
        setIsProgressRecipe(true);
      } // ee
    } else {
      console.log('Aqui é a meals', checkId);
      const chaveMeals = Object.keys(checkId?.meals);
      const resultMeal = chaveMeals.find((el) => el === id);
      if (resultMeal === id) {
        setIsProgressRecipe(true);
      }
    }
  }, []);

  const handleCopyBoard = () => {
    copy(`http://localhost:3000${pathname}`);
    setCopied(true);
    console.log(pathname);
  };
  const ClickToAddToFavorites = () => {
    console.log();
  };
  return (
    <div>
      {pathname === `/drinks/${id}` ? (d?.map((x, b) => (
        <div key={ b }>
          <h1 data-testid="recipe-title">{x.strDrink}</h1>
          <img
            src={ x.strDrinkThumb }
            data-testid="recipe-photo"
            alt={ x.strDrink }
          />
          <h3 data-testid="recipe-category">{x.strAlcoholic}</h3>
          <p data-testid="instructions">{x.strInstructions}</p>
          <div>
            <h3>Ingredients</h3>
            <ul>
              {
                ingredientsDrinks.filter((y) => typeof y === 'string')
                  .map((i, ind) => (
                    <li
                      data-testid={ `${ind}-ingredient-name-and-measure` }
                      key={ ind }
                    >
                      {`${i} ${measureDrinks[ind]}`}
                    </li>
                  ))
              }
            </ul>
          </div>
          <div>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="button-star-recipe"
              onClick={ handleClickDrinkInProgress }
            >
              { isProgressRecipe ? 'Continue Recipe' : 'Start Recipe' }
            </button>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ handleCopyBoard }
            >
              <img src="../images/shareIcon.svg" alt="Compartilhar Receita" />
            </button>
            {copied && <p>Link copied!</p> }
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ ClickToAddToFavorites }
            >
              Favoritar Receita
            </button>
          </div>
        </div>
      )))
        : (m?.map((x, a) => (
          <div key={ a }>
            <iframe
              src={ x.strYoutube }
              data-testid="video"
              title={ x.strMeal }
            />
            <h1 data-testid="recipe-title">{x.strMeal}</h1>
            <img
              src={ x.strMealThumb }
              data-testid="recipe-photo"
              alt={ x.strMeal }
            />
            <h3 data-testid="recipe-category">{x.strCategory}</h3>
            <p data-testid="instructions">{x.strInstructions}</p>
            <div>
              <h3>Ingredients</h3>
              <ul>
                {
                  ingredientsMeals.filter((y) => typeof y === 'string')
                    .map((i, index) => (
                      <li
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        key={ index }
                      >
                        {`${i} ${measureMeals[index]}`}
                      </li>
                    ))
                }
              </ul>
            </div>
            <div>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="button-star-recipe"
                onClick={ handleClickMealInProgress }
              >
                { isProgressRecipe ? 'Continue Recipe' : 'Start Recipe' }
              </button>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ handleCopyBoard }
              >
                <img src="../images/shareIcon.svg" alt="Compartilhar Receita" />
              </button>
              {copied && <p>Link copied!</p> }
              <button
                type="button"
                data-testid="favorite-btn"
                onClick={ ClickToAddToFavorites }
              >
                Favoritar Receita
              </button>
            </div>
          </div>
        )))}
    </div>
  );
}
