import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

import Table from "./Table";
import AddButton from "../UI/AddButton";
import { setActivePage } from "../../store/actions/actions";

class Patients extends Component {
  componentDidMount() {
    this.props.setActivePage("Dietetic - Patients");
  }
  render() {
    return (
      <>
        <Table />
        <Link to="/dietetic/patients/add">
          <AddButton />
        </Link>
      </>
    );
  }
}

Patients.propTypes = {};

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  null,
  mapDispatchToProps
)(Patients);
