import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function RecipeDetails() {
  const [m, setMeals] = useState();
  const [d, setDrinks] = useState();
  const [ingredientsMeals, setIngredientsMeals] = useState([]);
  const [ingredientsDrinks, setIngredientsDrinks] = useState([]);
  const [measureMeals, setMesureMeals] = useState([]);
  const [measureDrinks, setMesureDrinks] = useState([]);
  const { id } = useParams();
  console.log(id);
  const { pathname } = useLocation();
  console.log(m);

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

    console.log(newArray);
    setIngredientsDrinks(newArray);
    setIngredientsMeals(newArray);
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

  const handleApiMeals = async () => {
    const require = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await require.json();
    const ts = await meals[0];
    console.log(ts);
    proccessArrayIngredient(ts);
    proccessArrayMesure(ts);
    setMeals(meals);
  };

  const handleApiDrinks = async () => {
    const require = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await require.json();
    const ts = await drinks[0];
    console.log(ts);
    proccessArrayIngredient(ts);
    proccessArrayMesure(ts);
    setDrinks(drinks);
  };

  useEffect(() => {
    if (pathname === `/drinks/${id}`) {
      handleApiDrinks();
    } else {
      handleApiMeals();
    }
  }, []);

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
          </div>
        )))}
    </div>
  );
}
