import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const styles = makeStyles({
  fab: {
    position: "fixed",
    bottom: "1rem",
    left: "1rem"
  }
});

const AddButton = () => {
  const classes = styles();
  return (
    <Fab color="primary" aria-label="Add" className={classes.fab}>
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
