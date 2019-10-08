import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ItemList from "../ItemList/ItemList";
import Dietetic from "../Dietetic/Dietetic";

const AddDish = lazy(() => import("../AddDish/AddDish"));
const FavouritesList = lazy(() => import("../Favourites/FavouritesList"));
const MyDishes = lazy(() => import("../MyDishes/MyDishes"));
const Profile = lazy(() => import("../Profile/Profile"));
const Details = lazy(() => import("../Details/Details"));

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/list" component={ItemList} />
      <Route path="/add" component={WaitingComponent(AddDish)} />
      <Route path="/favourites" component={WaitingComponent(FavouritesList)} />
      <Route path="/mydishes" component={WaitingComponent(MyDishes)} />
      <Route path="/profile" component={WaitingComponent(Profile)} />
      <Route path="/details/:id" component={WaitingComponent(Details)} />
      <Route path="/dietetic" component={Dietetic} />
      <Redirect to="/list" />
    </Switch>
  );
};

const WaitingComponent = Component => {
  return props => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default AppRouter;
