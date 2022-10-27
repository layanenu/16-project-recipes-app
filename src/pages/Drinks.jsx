import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Recipes from './Recipes';

function Drinks() {
  const { dataDrink } = useContext(MyContext);
  const MAX = 12;

  return (
    <div>
      <Header />
      {console.log(dataDrink)}
      {dataDrink?.filter((x, i) => i < MAX)
        .map((e, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ e.idDrink }>
            <div data-testid={ `${index}-card-name` }>{e.strDrink}</div>
            <img
              data-testid={ `${index}-card-img` }
              src={ e.strDrinkThumb }
              alt={ e.strDrink }
            />
          </div>
        ))}
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
