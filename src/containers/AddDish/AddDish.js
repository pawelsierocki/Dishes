import React, { Component } from "react";
import { connect } from "react-redux";

import { firebaseApp, api } from "../../shared/firebase";
import "firebase/storage";

import axios from "axios";
import { withSnackbar } from "notistack";

import AddNewForm from "../../components/AddNew/AddNewForm";

const storageRef = firebaseApp.storage().ref();

class AddDish extends Component {
  handleAddNewDish = (newDish, file) => {
    if (!file) {
      this.postData(newDish);
      return;
    }

    const image = storageRef.child(newDish.title);

    image.put(file).then(snapshot => {
      image.getDownloadURL().then(url => {
        const dishWithImage = {
          ...newDish,
          imageUrl: url
        };

        this.postData(dishWithImage);
      });
    });
  };

  postData = newDish => {
    const { displayName, uid, email } = this.props.user;
    const userPropertiesForNewDish = { displayName, uid, email };
    //TODO: fetch-> change to global api class
    axios
      .post(api, {
        ...newDish,
        publishDate: new Date(),
        userPropertiesForNewDish
      })
      .then(() => {
        this.props.enqueueSnackbar(
          `Successfully added your dish: ${newDish.title}`,
          {
            variant: "success"
          }
        );
      })
      .catch(error => {
        this.props.enqueueSnackbar(`${error}`, {
          variant: "error"
        });
      });
  };

  render() {
    return <AddNewForm handleAddNew={this.handleAddNewDish} />;
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps)(withSnackbar(AddDish));
