import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "firebase/storage";

import { firebaseApp } from "../../constants/api";
import { addNewDish } from "../../shared/api/dishesAPI";
import { enqueueSnackbar } from "../../store/actions/notifier";
import AddNewForm from "../../components/AddNew/AddNewForm";
import { setActivePage } from "../../store/actions/actions";

const storageRef = firebaseApp.storage().ref();

class AddDish extends Component {
  constructor() {
    super();

    this.state = {
      success: false
    };
  }

  componentDidMount() {
    this.props.setActivePage("Dodaj nowe danie");
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
        this.props.enqueueSnackbar({ type: "addedNewDish" });

        this.setState({
          success: true
        });
      })
      .catch(() => {
        this.props.enqueueSnackbar({ type: "error" });
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

AddDish.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
  enqueueSnackbar: notify => dispatch(enqueueSnackbar(notify)),
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDish);
