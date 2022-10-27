import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function DrinkId() {
  const { drink } = useContext(MyContext);

  return (
    <div>

      DrinkId
      {drink}
    </div>
  );
}
