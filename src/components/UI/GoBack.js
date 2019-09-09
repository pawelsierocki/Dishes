import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  button: {
    marginBottom: "2rem",
    width: "9rem",
    textDecoration: "none"
  },
  btn: {
    fontSize: "10px",
    padding: "8px 20px"
  },
  leftIcon: {
    marginRight: "1rem",
    fontSize: 18
  }
});

const GoBack = () => {
  const classes = useStyles();

  return (
    <Link to="/dietetic/patients" className={classes.button}>
      <Button variant="contained" color="primary" className={classes.btn}>
        <ArrowBack className={classes.leftIcon} />
        Powrót
      </Button>
    </Link>
  );
};

export default GoBack;
