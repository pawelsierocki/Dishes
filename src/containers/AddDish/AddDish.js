import React, { Component } from "react";

import { firebaseApp } from "../../shared/firebase";

import AddNew from "../../components/AddNew/AddNew";

const storageRef = firebaseApp.storage().ref();

class AddDish extends Component {
  render() {
    return <AddNew upload={storageRef} />;
  }
}

export default AddDish;
