import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { calculateAge } from "../../store/helpers/patients";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "0 0 2rem 0"
  },
  header: {
    marginBottom: "1rem",
    fontSize: "18px"
  },
  paragraph: {
    fontStyle: "italic",
    fontSize: "14px",
    marginBottom: ".2rem"
  }
}));

export default function DataDisplay(props) {
  const classes = useStyles();

  const { activePatient } = props;

  return (
    <div>
      <Paper className={classes.root}>
        <Typography className={classes.header}>Patient details</Typography>

        <Typography className={classes.paragraph}>
          Name: {activePatient.data.fullName}
        </Typography>

        <Typography className={classes.paragraph}>
          Age: {calculateAge(activePatient.data.date)}
        </Typography>

        <Typography className={classes.paragraph}>
          Sex: {activePatient.data.sex}
        </Typography>

        <Typography className={classes.paragraph}>
          City: {activePatient.data.city}
        </Typography>

        <Typography className={classes.paragraph}>
          Telephone number: {activePatient.data.telephoneNumber}
        </Typography>
      </Paper>

      <Paper className={classes.root}>
        <Typography className={classes.header}>Interview details</Typography>

        {activePatient.data.interview ? (
          <Typography className={classes.paragraph}>
            Interview details
          </Typography>
        ) : (
          <Typography className={classes.paragraph}>
            No interview finished yet
          </Typography>
        )}
      </Paper>
    </div>
  );
}

DataDisplay.propTypes = {
  activePatient: PropTypes.object.isRequired
};
