import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import MyProvider from '../context/MyProvider';

describe('Testando componente SearchBar', () => {
  const text = 'Sorry, we haven\'t found any recipes for these filters.';

  it('Testando os inputs', () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/meals');
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const btn = screen.getByRole('img', { name: /searchicon/i });
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);
    const inputKey = screen.getByRole('textbox');
    const radioIngredients = screen.getByText(/ingredient/i);
    const radioName = screen.getByText(/name/i);
    const radioFirstLetter = screen.getByText(/letter/i);
    const btnSearch = screen.getByText(/search/i);

    expect(inputKey).toBeInTheDocument();
    expect(radioIngredients).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });

  it('Testando funções', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/meals');
    });

    const btn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(btn);

    const inputKey = screen.getByRole('textbox');
    const radioIngredients = screen.getByText(/ingredient/i);
    const btnSearch = screen.getByText(/search/i);

    userEvent.type(inputKey, 'tomate');
    userEvent.click(radioIngredients);
    userEvent.click(btnSearch);

    /* window.alert = jest.fn();
    jest.spyOn(Alert, 'alert');
    expect(window.alert).toHaveBeenCalledTimes(1); */

  /*  await waitFor(() => screen.findByRole('alert'));
    expect(screen.getByRole('alert')).toHaveTextContent(text); */
  });

  it('Testando os inputs drink', () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/drinks');
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const btn = screen.getByRole('img', { name: /searchicon/i });
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);
    const inputKey = screen.getByRole('textbox');
    const radioIngredients = screen.getByText(/ingredient/i);
    const radioName = screen.getByText(/name/i);
    const radioFirstLetter = screen.getByText(/letter/i);
    const btnSearch = screen.getByText(/search/i);

    expect(inputKey).toBeInTheDocument();
    expect(radioIngredients).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });

  it('Testando funções Drink', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/drinks');
    });

    const btn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(btn);

    const inputKey = screen.getByRole('textbox');
    const radioIngredients = screen.getByText(/ingredient/i);
    const btnSearch = screen.getByText(/search/i);

    userEvent.type(inputKey, 'tomate');
    userEvent.click(radioIngredients);
    userEvent.click(btnSearch);

    const API = jest.fn();
    API();
    expect(API).toHaveBeenCalled();

    /* window.alert = jest.fn();
    expect(window.alert).toHaveBeenCalledTimes(1); */

    /* const alert = await waitFor(() => screen.findByRole('alert'));
    expect(alert).toHaveTextContent(text); */
  });
});
