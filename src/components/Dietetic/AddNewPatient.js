import "date-fns";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { withStyles } from "@material-ui/core/styles";

import { setActivePage } from "../../store/actions/actions";
import AddNewPatientForm from "./AddNewPatientForm";
import { addNewPatient } from "../../shared/api/patientsAPI";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    marginBottom: "2rem",
    width: "9rem",
    textDecoration: "none",
  },
  btn: {
    fontSize: "10px",
    padding: "8px 20px"
  },
  leftIcon: {
    marginRight: "1rem",
    fontSize: 18
  }
};

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
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Link to="/dietetic/patients" className={classes.button}>
          <Button variant="contained" color="primary" className={classes.btn}>
            <ArrowBack className={classes.leftIcon} />
            Go back
          </Button>
        </Link>
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
  setActivePage: page => dispatch(setActivePage(page))
});

const mapeStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(
  mapeStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddNewPatient));
