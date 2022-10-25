import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}
export default function renderWithRouter2(
  component,
  {
    initialEntries = ['/drinks'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}
