import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";

import Drawer from "./components/UI/Drawer";
import AppRouter from "./containers/Router/AppRouter";
import Login from "./containers/Login/Login";
import Spinner from "./components/UI/Spinner";

import { firebaseApp } from "./shared/firebase";

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export class App extends Component {
  renderApp = () => {
    const { user, signInWithGoogle, signOut } = this.props;

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
          </>
        );
      }
    }
  };

  render() {
    return this.renderApp();
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
