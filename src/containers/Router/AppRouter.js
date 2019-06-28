import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import ItemList from "../ItemList/ItemList";
import FavouritesList from "../Favourites/FavouritesList";
import AddDish from "../AddDish/AddDish";

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/add" component={AddDish} />
      <Route path="/list" component={ItemList} />
      <Route path="/favourites" component={FavouritesList} />
      <Redirect to="/list" />
    </Switch>
  );
};

export default AppRouter;
