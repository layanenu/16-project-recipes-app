import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import MyProvider from '../context/MyProvider';

describe('Testando o a pagina profiles', () => {
  test('Testa se os ícones estão no documento', () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/profile');
    });

    const { pathname } = history.location;

    expect(pathname).toBe('/profile');

    const profile = screen.getByRole('heading', { name: /profile/i });

    const done = screen.getByRole('button', { name: /done recipes/i });
    const favorites = screen.getByRole('button', { name: /favorite recipes/i });
    const logout = screen.getByRole('button', { name: /logout/i });

    expect(done).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
  });

  it('testa a rota', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/profile');
    });

    const { pathname } = history.location;

    const logout = screen.getByRole('button', { name: /logout/i });

    userEvent.click(logout);

    await waitFor(() => {
      expect(pathname).toBe('/');
    }, { timeout: 2000 });
  });
});
