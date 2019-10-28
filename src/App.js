import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";

import { SnackbarProvider } from "notistack";

import Drawer from "./components/UI/Drawer";
import AppRouter from "./containers/Router/AppRouter";
import Login from "./containers/Login/Login";
import Spinner from "./components/UI/Spinner";
import Notifier from "./components/UI/Notifier";
import {
  fetchCurrentUserOnStart,
  setIngredients
} from "./store/actions/actions";

import { getAllIngredients } from "./shared/api/dishesAPI";
import { firebaseApp } from "./constants/api";

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export class App extends Component {
  renderApp = () => {
    const { user, signInWithGoogle, signOut, activePage } = this.props;

    this.props.fetchCurrentUserOnStart({ user: user });
    this.getIngredients();

    switch (user) {
      case undefined: {
        return <Spinner />;
      }

      case null: {
        return <Login login={signInWithGoogle} />;
      }

      default: {
        return (
          <>
            <Drawer logout={signOut} user={user} activePage={activePage} />
            <AppRouter />
            <SnackbarProvider>
              <Notifier />
            </SnackbarProvider>
          </>
        );
      }
    }
  };

  getIngredients = () => {
    getAllIngredients()
      .then(response => {
        this.props.setIngredients(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return this.renderApp();
  }
}

App.propTypes = {
  fetchCurrentUserOnStart: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  activePage: state.userReducer.activePage
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentUserOnStart: user => dispatch(fetchCurrentUserOnStart(user)),
  setIngredients: ingredients => dispatch(setIngredients(ingredients))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFirebaseAuth({
    providers,
    firebaseAppAuth
  })(App)
);
