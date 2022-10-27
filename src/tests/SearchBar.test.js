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

  it('Testando funções drinks', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/drinks');
    });

    const btn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(btn);

    const inputKey = screen.getByRole('textbox');
    const radioIngredients = screen.getByLabelText(/name/i);
    const btnSearch = screen.getByText(/search/i);

    global.alert = jest.fn();
    await act(async () => {
      userEvent.type(inputKey, 'chicken');
    });

    userEvent.click(radioIngredients);
    userEvent.click(btnSearch);
    await waitFor(() => {
      expect(global.alert).toBeCalledWith(text);
    });
  });

  it('testando função do meals', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/meals');
    });

    const btn2 = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(btn2);

    const inputKey2 = screen.getByRole('textbox');
    const radioIngredients2 = screen.getByLabelText(/ingredient/i);
    const btnSearch2 = screen.getByText(/search/i);

    global.alert = jest.fn();
    await act(async () => {
      userEvent.type(inputKey2, 'tomate');
    });

    userEvent.click(radioIngredients2);
    userEvent.click(btnSearch2);
    await waitFor(() => {
      expect(global.alert).toBeCalledWith(text);
    });
  });
});
