import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyCJ4P-4Ovyg1d5hfVy9FvPaDzA42jTHom0",
  authDomain: "reactproject-de081.firebaseapp.com",
  databaseURL: "https://reactproject-de081.firebaseio.com",
  projectId: "reactproject-de081",
  storageBucket: "reactproject-de081.appspot.com",
  messagingSenderId: "673278986165"
};

export const api = "https://reactproject-de081.firebaseio.com/dishes.json";

export const firebaseApp = firebase.initializeApp(config);