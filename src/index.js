import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MyProvider from './context/MyProvider';

ReactDOM
  .createRoot(document.getElementById('root'));
render(
  <BrowserRouter>
    <MyProvider>
      <App />
    </MyProvider>
  </BrowserRouter>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
