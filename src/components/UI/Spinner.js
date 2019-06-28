import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  }
};

const Spinner = props => {
  const { classes } = props;

  return (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
};

export default withStyles(styles)(Spinner);
