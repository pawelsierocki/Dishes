import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import PatientsTable from "./PatientsTable";
import AddButton from "../UI/AddButton";
import { setActivePage } from "../../store/actions/actions";
import { getPatientsForDietetic } from "../../shared/api/patientsAPI";
import { filterDishes } from "../../store/helpers/dishes";
import Spinner from "../UI/Spinner";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  top: {
    marginBottom: "1rem"
  },
  buttonAdd: {
    float: "right",
    width: "auto",
    height: "auto",
    borderRadius: 0,
    padding: "5px 15px",
    fontSize: "10px"
  }
};

class Patients extends Component {
  constructor() {
    super();

    this.state = {
      patients: null,
      loading: true
    };
  }

  componentDidMount() {
    this.props.setActivePage("Dietetic - Patients");

    this.getPatients();
  }

  getPatients = () => {
    getPatientsForDietetic(this.props.user.uid)
      .then(resp => {
        this.setState({
          patients: resp.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderTable = () => {
    const { patients, loading } = this.state;

    let mappedPatients = null;

    if (patients !== null) mappedPatients = filterDishes(patients);

    const render = loading ? (
      <Spinner />
    ) : !loading && patients !== null ? (
      <PatientsTable patients={mappedPatients} />
    ) : (
      <h2>No patients yet</h2>
    );

    return render;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.top}>
          <Link to="/dietetic/patients/add">
            <AddButton classes={classes.buttonAdd} text={"Add patient"} />
          </Link>
        </div>
        <div className={classes.bottom}>{this.renderTable()}</div>
      </div>
    );
  }
}

Patients.propTypes = {
  setActivePage: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Patients));
