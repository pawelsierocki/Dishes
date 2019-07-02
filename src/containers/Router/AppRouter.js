import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import ItemList from "../ItemList/ItemList";
import FavouritesList from "../Favourites/FavouritesList";
import AddDish from "../AddDish/AddDish";
import MyDishes from "../MyDishes/MyDishes";
import Profile from "../Profile/Profile";

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/add" component={AddDish} />
      <Route path="/list" component={ItemList} />
      <Route path="/favourites" component={FavouritesList} />
      <Route path="/mydishes" component={MyDishes} />
      <Route path="/profile" component={Profile} />
      <Redirect to="/list" />
    </Switch>
  );
};

export default AppRouter;
