import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import PatientsTable from "./PatientsTable";
import AddButton from "../UI/AddButton";
import {
  setActivePage,
  setSearchQuery,
  setActivePatient
} from "../../store/actions/actions";
import { getPatientsForDietetic } from "../../shared/api/patientsAPI";
import { filterDishes } from "../../store/helpers/dishes";
import Spinner from "../UI/Spinner";
import PatientsSearch from "./PatientsSearch";

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
  },
  "@media only screen and (max-width: 767px)": {
    buttonAdd: {
      float: "none",
      width: "100%",
      height: "auto",
      borderRadius: 0,
      padding: "5px 15px",
      fontSize: "10px",
      marginBottom: "1rem"
    }
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
    this.props.setActivePage("Dietetyk - Pacjenci");

    this.getPatients();
  }

  componentWillUnmount() {
    this.props.setSearchQuery("");
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
    const { searchQuery, classes } = this.props;

    let mappedPatients = null;

    if (patients !== null) mappedPatients = filterDishes(patients);

    if (searchQuery !== "" && patients !== null) {
      mappedPatients = mappedPatients.filter(patient =>
        patient.data.fullName.toUpperCase().includes(searchQuery.toUpperCase())
      );
    }

    const render = loading ? (
      <Spinner />
    ) : !loading && patients !== null && mappedPatients.length ? (
      <div className={classes.container}>
        <div className={classes.top}>
          <Link to="/dietetic/patients/add">
            <AddButton classes={classes.buttonAdd} text={"Dodaj pacjenta"} />
          </Link>
          <PatientsSearch />
        </div>
        <div className={classes.bottom}>
          <PatientsTable
            patients={mappedPatients}
            setActivePatient={this.setActivePatient}
          />
        </div>
      </div>
    ) : (
      <div className={classes.container}>
        <div className={classes.top}>
          <Link to="/dietetic/patients/add">
            <AddButton classes={classes.buttonAdd} text={"Dodaj pacjenta"} />
          </Link>
          <PatientsSearch />
        </div>
        <h3>No patients with this criteria</h3>
      </div>
    );

    return render;
  };

  setActivePatient = patient => {
    this.props.setActivePatient(patient);
  };

  render() {
    return this.renderTable();
  }
}

Patients.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  searchQuery: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page)),
  setSearchQuery: query => dispatch(setSearchQuery(query)),
  setActivePatient: patient => dispatch(setActivePatient(patient))
});

const mapStateToProps = state => ({
  user: state.userReducer.user,
  searchQuery: state.userReducer.searchQuery
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Patients));
