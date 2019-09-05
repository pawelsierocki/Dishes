import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";

import { setActivePage } from "../../store/actions/actions";

class Diet extends Component {
  componentDidMount() {
    this.props.setActivePage("Dietetyk - Diety");
  }

  render() {
    return <h2>Diet</h2>;
  }
}

Diet.propTypes = {};

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  null,
  mapDispatchToProps
)(Diet);
