import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [hideSearchInput, setHideSearchInput] = useState(false);
  const [food, setFood] = useState();
  const [drink, setDrink] = useState();
  const [ingredient, setIngredient] = useState(false);
  const [name, setName] = useState(false);
  const [letter, setLetter] = useState(false);

  /*   const [dataFood, setDataFood] = useState([]);
  const [dataDrink, setDataDrink] = useState([]); */

  const hideSearchBar = () => {
    setHideSearchInput(!hideSearchInput);
  };

  const handleInput = ({ target: { value } }) => {
    setFood(value);
    setDrink(value);
  };

  const handleRadioIngredient = useCallback(() => {
    setIngredient(!ingredient);
    setName(false);
    setLetter(false);
  }, [setIngredient, ingredient, setName, setLetter]);

  const handleRadioName = useCallback(() => {
    setName(!name);
    setIngredient(false);
    setLetter(false);
  }, [setName, name]);

  const handleRadioLetter = useCallback(() => {
    setLetter(!letter);
    setName(false);
    setIngredient(false);
  }, [setLetter, letter]);

  const filterFood = useCallback(async () => {
    try {
      if (ingredient) {
        const responseIngredientsFood = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${food}`);
        const dataIngredientsFood = await responseIngredientsFood.json();

        console.log(dataIngredientsFood);

        setDataFood(dataIngredientsFood);

        return dataIngredientsFood;
      } if (name) {
        const responseNameFood = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`);
        const dataNameFood = await responseNameFood.json();

        setDataFood(dataNameFood);

        return dataNameFood;
      }
      if (letter && food.length === 1) {
        const responseFirstLetterFood = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${food[0]}`);
        const dataFirstLetterFood = await responseFirstLetterFood.json();

        setDataFood(dataFirstLetterFood);

        return dataFirstLetterFood;
      }
      return global.alert('Your search must have only 1 (one) character');
    } catch (e) {
      throw new Error(e);
    }
  }, [food, ingredient, letter, name]);

  const filterDrink = useCallback(async () => {
    try {
      if (ingredient) {
        const responseIngredientsDrink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}`);
        const dataIngredientsDrink = await responseIngredientsDrink.json();

        setDataDrink(dataIngredientsDrink);
        console.log(dataIngredientsDrink);
        return dataIngredientsDrink;
      } if (name) {
        const responseNameDrink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`);
        const dataNameDrink = await responseNameDrink.json();

        setDataDrink(dataNameDrink);

        return dataNameDrink;
      }
      if (letter && drink.length === 1) {
        const responseFirstLetterDrink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${drink[0]}`);
        const dataFirstLetterDrink = await responseFirstLetterDrink.json();

        setDataDrink(dataFirstLetterDrink);

        return dataFirstLetterDrink;
      }
      return global.alert('Your search must have only 1 (one) character');
    } catch (e) {
      throw new Error(e);
    }
  }, [drink, ingredient, letter, name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    filterFood();
    filterDrink();
  };

  /*   const verifyDataSizeFood = () => {
    if (dataFood.length === 1) {
      return dataFood.idMeal;
    }
  };

  const verifyDataSizeDrink = () => {
    if (dataDrink.length === 1) {
      return dataDrink.idDrink;
    }
  }; */

  const context = useMemo(() => ({ hideSearchInput,
    setHideSearchInput,
    hideSearchBar,
    ingredient,
    name,
    letter,
    food,
    handleInput,
    handleRadioLetter,
    handleRadioName,
    handleSubmit,
    handleRadioIngredient }));

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
}.isRequired;

export default MyProvider;
