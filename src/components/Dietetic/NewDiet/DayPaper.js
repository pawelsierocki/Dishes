import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = () => ({
  paper: {
    display: "flex",
    transition: "all .5s",
    "&:hover": {
      boxShadow: "3px 3px 10px #a9a9a9",
      cursor: "pointer"
    },
    width: "100%"
  },
  header: {
    display: "flex",
    width: "200px",
    flexDirection: "column",
    padding: "10px",
    background: "#40aec7",
    color: "#fff",
    alignItems: "center",
    "& p": {
      margin: "0"
    }
  },
  content: {
    width: "100%"
  },
  number: {
    fontSize: "40px"
  },
  month: {
    fontSize: "16px",
    marginBottom: ".5rem !important"
  },
  day: {
    marginBottom: "1rem !important",
    fontSize: "12px",
    color: "#000"
  }
});

const DayPaper = props => {
  const { classes, dayName, dayNumber, monthName } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.header}>
        <p className={classes.number}>{dayNumber}</p>
        <p className={classes.month}>{monthName}</p>
        <p className={classes.day}>({dayName})</p>
      </div>
      <div className={classes.content}></div>
    </Paper>
  );
};

export default withStyles(styles)(DayPaper);
