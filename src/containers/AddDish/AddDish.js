import React, { Component } from "react";

import { firebaseApp } from "../../shared/firebase";

import axios from "axios";

import { api } from "../../shared/firebase";

import "firebase/storage";

import AddNewForm from "../../components/AddNew/AddNewForm";

import { withSnackbar } from "notistack";

const storageRef = firebaseApp.storage().ref();

class AddDish extends Component {
  handleAdd = (newDish, file) => {
    if (file) {
      const image = storageRef.child(newDish.title);
      image.put(file).then(snapshot => {
        image.getDownloadURL().then(url => {
          var dishWithImage = {
            ...newDish,
            imageUrl: url
          };
          this.postData(dishWithImage);
        });
      });
    } else {
      this.postData(newDish);
    }
  };

  postData = newDish => {
    axios
      .post(api, {
        ...newDish
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
    return <AddNewForm handleAddNew={this.handleAdd} />;
  }
}

export default withSnackbar(AddDish);
