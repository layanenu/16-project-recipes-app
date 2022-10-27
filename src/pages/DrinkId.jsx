import React, { useContext } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

export default function DrinkId() {
  const { drink } = useContext(MyContext);

  return (
    <div>
      <Header />
      DrinkId
      {drink}
    </div>
  );
}
