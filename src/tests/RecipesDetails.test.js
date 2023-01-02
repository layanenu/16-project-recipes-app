import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import MyProvider from '../context/MyProvider';

describe('Testando a página RecipesDetails', () => {
  it('Testa a tela de detalhes de drinks', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/drinks/15997');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997');
    expect(await screen.findByTestId('recipe-title', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-photo', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-category', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('instructions', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('0-ingredient-name-and-measure', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('share-btn', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('favorite-btn', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('start-recipe-btn', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('0-recommendation-card', {}, { timeout: 5000 })).toBeInTheDocument();
  });

  it('Testa a tela de detalhes de Meals', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/meals/52977');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977');
    expect(await screen.findByTestId('recipe-title', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-photo', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('instructions', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('0-ingredient-name-and-measure', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('share-btn', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('favorite-btn', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('start-recipe-btn', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByTestId('0-recommendation-card', {}, { timeout: 5000 })).toBeInTheDocument();
  });
});
