import React from "react";
import { Link } from "react-router-dom";

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
  },
  link: {
    textDecoration: "none"
  }
});

const AddButton = props => {
  const classes = useStyles();
  return (
    <Link to={props.href} className={classes.link}>
      <Fab color="primary" aria-label="Add" className={props.classes}>
        <p className={classes.text}>{props.text}</p>{" "}
        <AddIcon className={classes.icon} />
      </Fab>
    </Link>
  );
};

export default AddButton;
