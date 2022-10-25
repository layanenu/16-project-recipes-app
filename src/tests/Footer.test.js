import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import renderWithRouter2 from '../helpers/renderWithRouterMeals';
import MyProvider from '../context/MyProvider';
// import Meals from '../pages/Meals';

describe('Testando o componente Footer', () => {
  test('Testa se os ícones estão no documento', () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);
    const { location: { pathname } } = history;
    act(() => {
      history.push('/meals');
    });

    const drink = screen.getByRole('img', {
      name: /drink/i,
    });

    const meals = screen.getByRole('img', {
      name: /meals/i,
    });

    expect(drink).toBeInTheDocument();
    expect(meals).toBeInTheDocument();

    userEvent.click(meals);
    expect(pathname).toBe('/');
  });

  test('Testa se os ícones Meals funcionam e levam para sua respectiva página', () => {
    const { history } = renderWithRouter2(<MyProvider><App /></MyProvider>);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');

    const meals = screen.getByRole('button', {
      name: /meals/i,
    });

    userEvent.click(meals);

    expect(pathname).toBe('/meals');
  });

  // test('verifica aa rota Done recipes', () => {
  //   const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

  //   act(() => {
  //     history.push('/done-recipes');
  //   });

  //   const { pathname } = history.location;

  //   expect(pathname).toBe('/done-recipes');

  //   const doneRecipes = screen.getByRole('heading', { name: /done recipes/i });

  //   expect(doneRecipes).toBeInTheDocument();
  // });
});
