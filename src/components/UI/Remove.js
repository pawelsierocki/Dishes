import React from "react";

import RemoveIcon from "@material-ui/icons/Delete";

import { withStyles } from "@material-ui/styles";

const styles = {
  iconContainer: {
    display: "flex",
    alignItems: "center",
    transition: "all .5s",
    "&:hover": {
      cursor: "pointer",
      color: "red"
    }
  }
};

const RemoveButton = props => {
  const { classes } = props;

  return (
    <div className={classes.iconContainer}>
      <RemoveIcon />
    </div>
  );
};

export default withStyles(styles)(RemoveButton);
