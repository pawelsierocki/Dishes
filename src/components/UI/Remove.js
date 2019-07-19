import React from "react";
import PropTypes from "prop-types";

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

RemoveButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RemoveButton);
