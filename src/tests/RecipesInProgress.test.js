import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import MyProvider from '../context/MyProvider';

describe('Testando a página RecipesInProgress', () => {
  it('Testa a tela de RecipesInProgress de drinks', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);
    act(() => {
      history.push('/drinks/15997/in-progress');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997/in-progress');
    expect(await screen.findByTestId('recipe-title', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-category', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('instructions', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('share-btn', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('favorite-btn', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('finish-recipe-btn', {}, { timeout: 5000 })).toBeInTheDocument();
  });

  it('Testa a tela de RecipesInProgress de Meals', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/meals/52977/in-progress');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977/in-progress');
    expect(await screen.findByTestId('recipe-title', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-category', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('instructions', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('share-btn', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('favorite-btn', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('finish-recipe-btn', {}, { timeout: 5000 })).toBeInTheDocument();
  });
});
