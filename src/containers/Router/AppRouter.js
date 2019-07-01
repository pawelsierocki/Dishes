import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import ItemList from "../ItemList/ItemList";
import FavouritesList from "../Favourites/FavouritesList";
import AddDish from "../AddDish/AddDish";
import MyDishes from "../MyDishes/MyDishes";

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/add" component={AddDish} />
      <Route path="/list" component={ItemList} />
      <Route path="/favourites" component={FavouritesList} />
      <Route path="/mydishes" component={MyDishes} />
      <Redirect to="/list" />
    </Switch>
  );
};

export default AppRouter;
