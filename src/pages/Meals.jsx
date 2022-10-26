import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Meals() {
  const { dataFood } = useContext(MyContext);
  console.log(dataFood);

  return (
    <div>
      <Header />
      {dataFood?.map((e, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ e.idMeal }>
          <div data-testid={ `${index}-card-name` }>{e.strMeal}</div>
          <img
            data-testid={ `${index}-card-img` }
            src={ e.strMealThumb }
            alt={ e.strMeal }
          />
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Meals;
