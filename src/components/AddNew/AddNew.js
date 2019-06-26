import React, { Component } from "react";
import axios from "axios";

import { api } from "../../shared/firebase";

import AddNewForm from "./AddNewForm";

import { withSnackbar } from "notistack";

class AddNew extends Component {
  handleAdd = (title, shortDescription, fullDescription, favourite) => {
    axios
      .post(api, {
        title,
        shortDescription,
        fullDescription,
        favourite
      })
      .then(() => {
        this.props.enqueueSnackbar(`Successfully added your dish: ${title}`, {
          variant: "success"
        });
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

export default withSnackbar(AddNew);
