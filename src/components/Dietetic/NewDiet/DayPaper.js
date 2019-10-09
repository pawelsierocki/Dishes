import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

const styles = () => ({
  paper: {
    marginBottom: "2rem",
    display: "flex"
  },
  header: {
    display: "flex",
    width: "200px",
    boxShadow: "5px 2px 5px -2px #a9a9a9",
    flexDirection: "column",
    alignItems: "center",
    "& p": {
      margin: "0"
    }
  },
  content: {
    width: "100%"
  },
  number: {
    fontSize: "50px"
  },
  month: {
    fontSize: "20px",
    marginBottom: ".5rem !important"
  },
  day: {
    marginBottom: "1rem !important",
    fontSize: "14px",
    color: "red"
  }
});

class DayPaper extends Component {
  render() {
    const { classes, dayName, dayNumber, monthName } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <p className={classes.number}>{dayNumber}</p>
            <p className={classes.month}>{monthName}</p>
            <p className={classes.day}>({dayName})</p>
          </div>
          <div className={classes.content}></div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(DayPaper);
