import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [hideSearchInput, setHideSearchInput] = useState(false);
  const [food, setFood] = useState();
  const [drink, setDrink] = useState();
  const [ingredient, setIngredient] = useState(false);
  const [name, setName] = useState(false);
  const [letter, setLetter] = useState(false);

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

        const responseIngredientsDrink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drink}`);
        const dataIngredientsDrink = await responseIngredientsDrink.json();

        console.log(dataIngredientsFood, dataIngredientsDrink);
        return (dataIngredientsFood, dataIngredientsDrink);
      } if (name) {
        const responseNameFood = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`);
        const dataNameFood = await responseNameFood.json();

        const responseNameDrink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`);
        const dataNameDrink = await responseNameDrink.json();

        console.log(dataNameFood, dataNameDrink);
        return (dataNameFood, dataNameDrink);
      }
      if (letter && food.length === 1) {
        const responseFirstLetterFood = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${food[0]}`);
        const dataFirstLetterFood = await responseFirstLetterFood.json();

        const responseFirstLetterDrink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${drink[0]}`);
        const dataFirstLetterDrink = await responseFirstLetterDrink.json();

        console.log(dataFirstLetterFood, dataFirstLetterDrink);
        return (dataFirstLetterFood, dataFirstLetterDrink);
      }
      return global.alert('Your search must have only 1 (one) character');
    } catch (e) {
      throw new Error(e);
    }
  }, [drink, food, ingredient, letter, name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    filterFood();
  };

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
