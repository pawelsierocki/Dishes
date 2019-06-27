import React, { Component } from "react";
import axios from "axios";

import { api } from "../../shared/firebase";

import AddNewForm from "./AddNewForm";

import { withSnackbar } from "notistack";

class AddNew extends Component {
  handleAdd = (newDish, file) => {
    console.log(file);
    if (file) {
      const image = this.props.upload.child(newDish.title);
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
    console.log(newDish);
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
    return (
      <AddNewForm handleAddNew={this.handleAdd} upload={this.props.upload} />
    );
  }
}

export default withSnackbar(AddNew);
