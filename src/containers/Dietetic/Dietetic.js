import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core";

import Submenu from "../../components/Dietetic/Submenu";
import Patients from "../../components/Dietetic/Patients";
import Diet from "../../components/Dietetic/Diet";
import AddNewPatient from "../../components/Dietetic/AddNewPatient";

const styles = {
  submenu: {
    marginTop: ".8rem"
  }
};

class Dietetic extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.submenu}>
          <Submenu />
        </div>
        <div className={classes.main}>
          <Route path="/dietetic/patients" exact component={Patients} />
          <Route path="/dietetic/patients/add" component={AddNewPatient} />
          <Route path="/dietetic/diet" component={Diet} />
        </div>
      </>
    );
  }
}

Dietetic.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dietetic);
