import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import { setActivePage } from "../../store/actions/actions";

import Stepper from "../UI/Stepper";
import GoBack from "../UI/GoBack";
import { addInterviewForPatient } from "../../shared/api/patientsAPI";

const styles = () => ({
  top: {
    marginBottom: "2rem"
  }
});

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

    const primaryForm = JSON.parse(localStorage.getItem("primaryForm"));
    const extendedForm = JSON.parse(localStorage.getItem("extendedForm"));

    const interview = { ...primaryForm, ...extendedForm };

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
    const { classes } = this.props;

    return this.props.activePatient && !this.state.submittedInterview ? (
      <>
        <div className={classes.top}>
          <GoBack
            href={`/dietetic/patients/id/${this.props.activePatient.id}`}
          />
        </div>
        <Stepper handleAddInterview={this.saveInterview} />
      </>
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
)(withStyles(styles)(PatientDetails));
