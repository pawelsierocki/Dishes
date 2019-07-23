import "date-fns";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setActivePage } from "../../store/actions/actions";
import AddNewPatientForm from "./AddNewPatientForm";
import { addNewPatient } from "../../shared/api/patientsAPI";

class AddNewPatient extends Component {
  componentDidMount() {
    this.props.setActivePage("Dietetic - Patients - Add new patient");
  }

  handleAddPatient = patient => {
    addNewPatient(this.props.user.uid, patient)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return <AddNewPatientForm handleAddPatient={this.handleAddPatient} />;
  }
}

AddNewPatient.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

const mapeStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(
  mapeStateToProps,
  mapDispatchToProps
)(AddNewPatient);
