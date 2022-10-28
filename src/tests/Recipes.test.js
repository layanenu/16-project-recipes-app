import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import MyProvider from '../context/MyProvider';

describe('Recipes testing', () => {
  it('Testing render of the meals', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/meals');
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const btn1 = await screen.findByRole('button', { name: /beef/i }, {}, { timeout: 2000 });
    const btn2 = await screen.findByRole('button', { name: /breakfast/i }, {}, { timeout: 2000 });
    const btn3 = await screen.findByRole('button', { name: /chicken/i }, {}, { timeout: 2000 });
    const btn4 = await screen.findByRole('button', { name: /dessert/i }, {}, { timeout: 2000 });
    const btn5 = await screen.findByRole('button', { name: /goat/i }, {}, { timeout: 2000 });

    const btn6 = screen.getByRole('button', { name: /all/i });

    await waitFor(() => {
      expect(btn1).toBeInTheDocument();
      expect(btn2).toBeInTheDocument();
      expect(btn3).toBeInTheDocument();
      expect(btn4).toBeInTheDocument();
      expect(btn5).toBeInTheDocument();
    });

    expect(btn6).toBeInTheDocument();
  });

  it('Testing render of the drinks', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/drinks');
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const btnDrink1 = await screen.findByRole('button', { name: /ordinary drink/i }, {}, { timeout: 2000 });
    const btnDrink2 = await screen.findByRole('button', { name: /cocktail/i }, {}, { timeout: 2000 });
    const btnDrink3 = await screen.findByRole('button', { name: /shake/i }, {}, { timeout: 2000 });
    const btnDrink4 = await screen.findByRole('button', { name: /other\/unknown/i }, {}, { timeout: 2000 });
    const btnDrink5 = await screen.findByRole('button', { name: /cocoa/i }, {}, { timeout: 2000 });

    const btnDrink6 = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnDrink6);

    await waitFor(() => {
      expect(btnDrink1).toBeInTheDocument();
      expect(btnDrink2).toBeInTheDocument();
      expect(btnDrink3).toBeInTheDocument();
      expect(btnDrink4).toBeInTheDocument();
      expect(btnDrink5).toBeInTheDocument();
    });

    expect(btnDrink6).toBeInTheDocument();
  });

  it('Testing func', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/meals');
    });

    const btn1 = await screen.findByRole('button', { name: /beef/i }, {}, { timeout: 2000 });
    userEvent.click(btn1);

    const btn2 = await screen.findByRole('button', { name: /breakfast/i }, {}, { timeout: 2000 });
    userEvent.click(btn2);

    await waitFor(() => {
      const result1 = screen.getByTestId('0-recipe-card');
      expect(result1).toBeInTheDocument();
      const result2 = screen.getByText(/breakfast potatoes/i);
      expect(result2).toBeInTheDocument();
    });
  });

  it('Testing func Drink', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/drinks');
    });

    const btnDrink1 = await screen.findByRole('button', { name: /ordinary drink/i }, {}, { timeout: 2000 });
    userEvent.click(btnDrink1);

    await waitFor(() => {
      const result1 = screen.getByText(/gg/i);
      expect(result1).toBeInTheDocument();
    });
  });

  it('Testing func Drink render', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/drinks');
    });

    const btnDrink2 = await screen.findByRole('button', { name: /cocktail/i }, {}, { timeout: 2000 });
    userEvent.click(btnDrink2);

    waitFor(() => {
      const result = screen.getByText(/155 belmont/i);
      expect(result).toBeInTheDocument();
    });
  });

/*   it('Delete all button', async () => {
    const { history } = renderWithRouter(<MyProvider><App /></MyProvider>);

    act(() => {
      history.push('/drinks');
    });

    const btnDrink6 = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnDrink6);

    waitFor(() => {
      const result1 = screen.getByTestId('0-recipe-card');
      expect(result1).toBeInTheDocument();
    });
  }); */
});
