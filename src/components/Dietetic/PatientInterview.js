import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { setActivePage } from "../../store/actions/actions";

import PatientInterviewForm from "./PatientInterviewForm";
import Stepper from "../UI/Stepper";

class PatientDetails extends Component {
  componentDidMount() {
    if (this.props.activePatient) {
      this.props.setActivePage(
        `Dietetic - Patients - ${this.props.activePatient.data.fullName} - Interview`
      );
    }
  }

  render() {
    return this.props.activePatient ? (
      <>
        <Stepper patientId={this.props.activePatient.id}/>
        <PatientInterviewForm />
      </>
    ) : (
      <Redirect to="/dietetic/patients" />
    );
  }
}

PatientDetails.propTypes = {
  setActivePage: PropTypes.func.isRequired
};

const mapStateToProps = props => ({
  activePatient: props.userReducer.activePatient
});

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDetails);
