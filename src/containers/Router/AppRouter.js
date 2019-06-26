import React, { Component } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import ItemList from "../ItemList/ItemList";
import FavouritesList from "../Favourites/FavouritesList";
import AddDish from "../AddDish/AddDish";
import Drawer from "../../components/Drawer";

class AppRouter extends Component {
  render() {
    return (
      <Drawer>
        <Switch>
          <Route path="/add" component={AddDish} />
          <Route path="/list" component={ItemList} />
          <Route path="/favourites" component={FavouritesList} />
          <Redirect to="/list" />
        </Switch>
      </Drawer>
    );
  }
}

export default AppRouter;
