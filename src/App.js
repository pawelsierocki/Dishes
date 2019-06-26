import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";

import AppRouter from "./containers/Router/AppRouter";
import Login from "./containers/Login/Login";
import Spinner from "./components/Spinner";

import { firebaseApp } from "./shared/firebase";

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export class App extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    const appView = <AppRouter logout={signOut} user={user} />;
    const appLogin = <Login login={signInWithGoogle} />;
    const spinnerView = (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          translate: "transform(-50%,-50%)"
        }}
      >
        <Spinner />
      </div>
    );

    const appRender =
      user === undefined ? spinnerView : user === null ? appLogin : appView;

    return appRender;
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
