import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import './RecipeDetails.css';

export default function RecipeDetails() {
  const { setIngredientsGlobal } = useContext(MyContext);
  const [m, setMeals] = useState();
  const [d, setDrinks] = useState();
  const [ingredientsMeals, setIngredientsMeals] = useState([]);
  const [ingredientsDrinks, setIngredientsDrinks] = useState([]);
  const [measureMeals, setMesureMeals] = useState([]);
  const [measureDrinks, setMesureDrinks] = useState([]);

  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();

  // console.log(m);

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
    // console.log(ts);
    proccessArrayIngredient(ts);
    proccessArrayMesure(ts);
    setMeals(meals);
  }, [id]);

  const handleApiDrinks = useCallback(async () => {
    const require = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await require.json();
    const ts = await drinks[0];
    console.log(ts);
    proccessArrayIngredient(ts);
    proccessArrayMesure(ts);
    setDrinks(drinks);
  }, [id]);

  useEffect(() => {
    if (pathname === `/drinks/${id}`) {
      handleApiDrinks();
    } else {
      handleApiMeals();
    }
  }, [pathname, id, handleApiDrinks, handleApiMeals]);

  // console.log(pathname);
  // const allIngredients = { ...listaDeIngredientesDrinks, ...listaDeIngredientesMeals };

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
    } else {
      rota = 'drinks';
    }
    let objectString = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    if (!objectString) {
      objectString = { meals: {}, drinks: {} };
    }
    console.log(stringNameObject);

    // const objectString = JSON.parse(objectString);
    objectString[rota][id] = stringNameObject === 'meals'
      ? ingredientsMeals : ingredientsDrinks;
    localStorage.setItem('inProgressRecipes', JSON.stringify(objectString));
  }

  const handleClickDrinkInProgress = () => {
    history.push(`/drinks/${id}/in-progress`);
    concactLocalStorage(listaDeIngredientesDrinks, 'inProgressRecipes');
    const checkDrinkId = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    const chave = Object.keys(checkDrinkId.drinks);
    const verificarButton = JSON.stringify(chave) === id;
    console.log(typeof chave);
    console.log(verificarButton);
  };

  const handleClickMealInProgress = () => {
    history.push(`/meals/${id}/in-progress`);
    concactLocalStorage(listaDeIngredientesMeals, 'inProgressRecipes');
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
              Start Recipe
            </button>
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
                Start Recipe
              </button>
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
            </div>
          </div>
        )))}
    </div>
  );
}
