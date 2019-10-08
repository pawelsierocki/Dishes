import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core";

import Submenu from "../../components/Dietetic/Submenu";
import DieteticRouter from "../Router/DieteticRouter";

const styles = {
  submenu: {
    marginTop: ".8rem"
  },
  main: {
    width: "80%",
    margin: "3rem auto"
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
          <DieteticRouter />
        </div>
      </>
    );
  }
}

Dietetic.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dietetic);
