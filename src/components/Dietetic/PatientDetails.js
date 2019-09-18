import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { setActivePage } from "../../store/actions/actions";
import GoBack from "../UI/GoBack";
import InterviewDialog from "../UI/InterviewDialog";
import Popup from "../UI/Popup";
import DataDisplay from "../UI/DataDisplay";

const styles = () => ({
  top: {
    marginBottom: "2rem"
  },
  inner: {
    marginTop: "2rem"
  }
});

class PatientDetails extends Component {
  componentDidMount() {
    if (this.props.activePatient) {
      this.props.setActivePage(
        `Dietetyk - Pacjenci - ${this.props.activePatient.data.fullName}`
      );
    }
  }

  render = () => {
    const { activePatient, classes } = this.props;

    const render = activePatient ? (
      <div className={classes.container}>
        <div className={classes.top}>
          <GoBack href={"/dietetic/patients"} />
        </div>
        <div className={classes.bottom}>
          <>
            {!activePatient.data.interview && (
              <>
                <InterviewDialog activePatient={activePatient} />
                <Popup
                  title={"Ostrzeżenie !"}
                  message={
                    "Wywiad żywieniowy nie został przeprowadzony ! Aby móc ułożyć jadłospis dla tego pacjenta należy najpierw wypełnić ankietę zdrowotną !"
                  }
                  warning={true}
                  activePatient={this.props.activePatient}
                />
              </>
            )}

            <div className={classes.inner}>
              <DataDisplay activePatient={activePatient} />
            </div>
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
