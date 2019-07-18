import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "firebase/storage";

import { firebaseApp } from "../../constants/api";
import { addNewDish } from "../../shared/api/dishesAPI";
import AddNewForm from "../../components/AddNew/AddNewForm";

import { withSnackbar } from "notistack";

const storageRef = firebaseApp.storage().ref();

class AddDish extends Component {
  constructor() {
    super();

    this.state = {
      success: false
    };
  }

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
    const user = { displayName, uid, email };

    addNewDish({
      ...newDish,
      publishDate: new Date(),
      user
    })
      .then(() => {
        this.props.enqueueSnackbar(
          `Successfully added your dish: ${newDish.title}`,
          {
            variant: "success"
          }
        );

        this.setState({
          success: true
        });
      })
      .catch(error => {
        this.props.enqueueSnackbar(`${error}`, {
          variant: "error"
        });
      });
  };

  render() {
    const { success } = this.state;
    return !success ? (
      <AddNewForm handleAddNew={this.handleAddNewDish} />
    ) : (
      <Redirect to="/mydishes" />
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps)(withSnackbar(AddDish));
