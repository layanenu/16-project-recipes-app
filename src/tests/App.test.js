import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

test('Testando tela de Login', () => {
  const EMAIL = 'trybe@gmail.com';
  const PASSWORD = '123456';
  // Este arquivo pode ser modificado ou deletado sem problemas
  render(<Login />);
  const h1 = screen.getByText(/Login/i);
  expect(h1).toBeInTheDocument();

  const email = screen.getByTestId('email-input');
  expect(email).toBeInTheDocument();

  const password = screen.getByTestId('password-input');
  expect(password).toBeInTheDocument();

  const btn = screen.getByTestId('login-submit-btn');
  expect(btn).toBeInTheDocument();
  expect(btn).toBeDisabled();

  userEvent.type(email, EMAIL);
  userEvent.type(password, PASSWORD);
  expect(btn).not.toBeDisabled();
  userEvent.click(btn);

  const storedUserEmail = JSON.parse(localStorage.getItem('user'));
  console.log(storedUserEmail);
  expect(storedUserEmail.length).toBe(1);
  expect(spy).toBeCalled();

  expect(window.location.pathname).toBe('/');
});
