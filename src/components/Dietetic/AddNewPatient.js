import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";

import { setActivePage } from "../../store/actions/actions";

class AddNewPatient extends Component {
  componentDidMount() {
    this.props.setActivePage("Dietetic - Add new patient");
  }

  render() {
    return <h2>AddNewPatient</h2>;
  }
}

AddNewPatient.propTypes = {};

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  null,
  mapDispatchToProps
)(AddNewPatient);
