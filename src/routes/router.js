import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';

function Routers() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route exact path="/meals" component={ } />
    <Route exact path="/drinks" component={ } />
    <Route exact path="/meals/:id-da-receita" component={ } />
    <Route exact path="/drinks/:id-da-receita" component={ } />
    <Route exact path="/meals/:id-da-receita/in-progress" component={ } />
    <Route exact path="/drinks/:id-da-receita/in-progress" component={ } />
    <Route exact path="/profile" component={ } />
    <Route exact path="/done-recipes" component={ } />
    <Route exact path="/favorite-recipes" component={ } /> */}
    </Switch>
  );
}

export default Routers;
