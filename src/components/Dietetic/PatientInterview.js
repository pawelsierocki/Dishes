import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { setActivePage } from "../../store/actions/actions";

import Stepper from "../UI/Stepper";
import { addInterviewForPatient } from "../../shared/api/patientsAPI";

class PatientDetails extends Component {
  constructor() {
    super();

    this.state = {
      submittedInterview: false
    };
  }

  componentDidMount() {
    if (this.props.activePatient) {
      this.props.setActivePage(
        `Dietetyk - Pacjenci - ${this.props.activePatient.data.fullName} - Wywiad żywieniowy`
      );
    }
  }

  saveInterview = () => {
    const { activePatient, user } = this.props;

    var interview = {
      height: 180,
      weight: 82
    };

    addInterviewForPatient(user.uid, activePatient.id, interview)
      .then(() => {
        this.setState({
          submittedInterview: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return this.props.activePatient && !this.state.submittedInterview ? (
      <Stepper handleAddInterview={this.saveInterview} />
    ) : (
      <Redirect to="/dietetic/patients" />
    );
  }
}

PatientDetails.propTypes = {
  setActivePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activePatient: state.userReducer.activePatient,
  user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDetails);
