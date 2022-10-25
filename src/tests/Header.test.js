import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testando component Header', () => {
  test('testa se os elementos de profile, search e nome são renderizados', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const image = screen.getByRole('img', { name: /perfil/i });
    const searchIcon = screen.getByRole('img', { name: /searchicon/i });
    const pageName = screen.getByRole('heading', { name: /meals/i });

    const { pathname } = history.location;

    expect(image).toBeInTheDocument();
    expect(pathname).toBe('/meals');
    expect(searchIcon).toBeInTheDocument();
    expect(pageName).toBeInTheDocument();
  });

  test('Testa se o link  funciona e se o pageIcon é renderizado somente nas rotas corretas', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const imageLink = screen.getByRole('img', { name: /perfil/i });
    const searchIcon = screen.getByRole('img', { name: /searchicon/i });

    expect(searchIcon).toBeInTheDocument();

    userEvent.click(imageLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/profile');

    expect(searchIcon).not.toBeInTheDocument();
  });

  test('verifica aa rota Done recipes', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/done-recipes');
    });

    const { pathname } = history.location;

    expect(pathname).toBe('/done-recipes');

    const doneRecipes = screen.getByRole('heading', { name: /done recipes/i });

    expect(doneRecipes).toBeInTheDocument();
  });
});
