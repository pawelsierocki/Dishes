import "date-fns";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { setActivePage } from "../../store/actions/actions";
import { enqueueSnackbar } from "../../store/actions/notifier";
import AddNewPatientForm from "./AddNewPatientForm";
import { addNewPatient } from "../../shared/api/patientsAPI";
import GoBack from "../UI/GoBack";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  }
};

class AddNewPatient extends Component {
  constructor() {
    super();

    this.state = {
      addedNewPatient: false
    };
  }

  componentDidMount() {
    this.props.setActivePage("Dietetic - Patients - Add new patient");
  }

  handleAddPatient = patient => {
    addNewPatient(this.props.user.uid, { ...patient, interview: false })
      .then(() => {
        this.props.enqueueSnackbar({ type: "addedNewPatient" });
        this.setState({
          addedNewPatient: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  redirectToMain = () => {
    return <Redirect to={"/dietetic/patients"} />;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {this.state.addedNewPatient && this.redirectToMain()}
        <GoBack />
        <AddNewPatientForm handleAddPatient={this.handleAddPatient} />
      </div>
    );
  }
}

AddNewPatient.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page)),
  enqueueSnackbar: notify => dispatch(enqueueSnackbar(notify))
});

const mapeStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(
  mapeStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddNewPatient));
