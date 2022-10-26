import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import DrinkId from '../pages/DrinkId';
import MealId from '../pages/MealId';

function Routers() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/drinks/:id-da-receita" component={ DrinkId } />
      <Route exact path="/meals/:id-da-receita" component={ MealId } />
      <Route exact path="/meals/:id-da-receita/in-progress" component={ Meals } />
      <Route exact path="/drinks/:id-da-receita/in-progress" component={ Drinks } />
    </Switch>
  );
}

export default Routers;
