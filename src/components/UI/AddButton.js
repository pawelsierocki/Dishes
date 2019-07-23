import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles({
  text: {
    margin: "0 1rem 0 0"
  },
  icon: {
    width: ".8em",
    height: ".8em"
  }
});

const AddButton = props => {
  const classes = useStyles();
  return (
    <Fab color="primary" aria-label="Add" className={props.classes}>
      <p className={classes.text}>{props.text}</p>{" "}
      <AddIcon className={classes.icon} />
    </Fab>
  );
};

export default AddButton;
