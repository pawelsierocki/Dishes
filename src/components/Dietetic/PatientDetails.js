import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setActivePage } from "../../store/actions/actions";
import GoBack from "../UI/GoBack";

class PatientDetails extends Component {
  componentDidMount() {
    this.props.setActivePage(
      `Dietetic - Patients ${this.props.match.params.id}`
    );
  }

  render() {
    return <GoBack />;
  }
}

PatientDetails.propTypes = {
  setActivePage: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  null,
  mapDispatchToProps
)(PatientDetails);
