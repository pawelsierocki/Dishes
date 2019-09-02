import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { setActivePage } from "../../store/actions/actions";
import GoBack from "../UI/GoBack";
import InterviewDialog from "../UI/InterviewDialog";

const styles = () => ({
  top: {
    marginBottom: "2rem"
  }
});

class PatientDetails extends Component {
  componentDidMount() {
    this.props.setActivePage(
      `Dietetic - Patients - ${this.props.activePatient.data.fullName}`
    );
  }

  render = () => {
    const { activePatient, classes } = this.props;

    const render = activePatient ? (
      <div className={classes.container}>
        <div className={classes.top}>
          <GoBack />
        </div>
        <div className={classes.bottom}>
          <>
            {!activePatient.data.interview && (
              <InterviewDialog activePatient={activePatient} />
            )}
            {activePatient.data.fullName}
          </>
        </div>
      </div>
    ) : (
      <Redirect to="/dietetic/patients" />
    );

    return render;
  };

  render() {
    return this.render();
  }
}

PatientDetails.propTypes = {
  setActivePage: PropTypes.func.isRequired
};

const mapStateToProps = props => ({
  activePatient: props.userReducer.activePatient
});

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PatientDetails));
