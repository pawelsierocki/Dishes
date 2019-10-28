import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = () => ({
  paper: {
    marginBottom: "2rem",
    display: "flex",
    transition: "all .5s",
    "&:hover": {
      boxShadow: "2px 2px 5px #a9a9a9",
      cursor: "pointer"
    },
    height: "100%"
  }
});

const MacroPaper = props => {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <p>{props.dayNumber}</p>
    </Paper>
  );
};

export default withStyles(styles)(MacroPaper);
