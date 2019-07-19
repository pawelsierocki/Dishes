import React, { Component } from "react";
import { connect } from "react-redux";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";

import { SnackbarProvider } from "notistack";

import Drawer from "./components/UI/Drawer";
import AppRouter from "./containers/Router/AppRouter";
import Login from "./containers/Login/Login";
import Spinner from "./components/UI/Spinner";
import Notifier from "./components/UI/Notifier";
import { fetchCurrentUserOnStart } from "./store/actions/actions";
import { firebaseApp } from "./constants/api";

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export class App extends Component {
  renderApp = () => {
    const { user, signInWithGoogle, signOut } = this.props;

    this.props.fetchCurrentUserOnStart({ user: user });

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
            <Drawer logout={signOut} user={user} />
            <AppRouter />
            <SnackbarProvider>
              <Notifier />
            </SnackbarProvider>
          </>
        );
      }
    }
  };

  render() {
    return this.renderApp();
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCurrentUserOnStart: user => dispatch(fetchCurrentUserOnStart(user))
});

export default connect(
  null,
  mapDispatchToProps
)(
  withFirebaseAuth({
    providers,
    firebaseAppAuth
  })(App)
);
