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
  });

  test('Testa se os ícones Meals funcionam e levam para sua respectiva página', () => {
    const { history } = renderWithRouter2(<MyProvider><App /></MyProvider>);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');

    const meals = screen.getByRole('img', {
      name: /meals/i,
    });

    expect(meals).toBeInTheDocument();

    userEvent.click(meals);

    expect(pathname).toBe('/meals');
  });

  test('testa o icone Drinks', () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);
    const { pathname } = history.location;

    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/password/i);

    userEvent.type(email, 'jf.furieri@ymail.com');
    userEvent.type(password, '12345678');

    const button = screen.getByRole('button', { name: /enter/i });

    userEvent.click(button);

    expect(pathname).toBe('/meals');
  });
});
