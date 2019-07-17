import React, { Component } from "react";
import { connect } from "react-redux";
import "firebase/storage";

import { firebaseApp } from "../../constants/api";
import { addNewDish } from "../../shared/api/dishesAPI";
import AddNewForm from "../../components/AddNew/AddNewForm";

import { withSnackbar } from "notistack";

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
