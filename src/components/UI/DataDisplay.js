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
  },
  bold: {
    fontWeight: "bold"
  }
}));

export default function DataDisplay(props) {
  const classes = useStyles();

  const { activePatient } = props;

  return (
    <div>
      <Paper className={classes.root}>
        <Typography className={classes.header}>Dane pacjenta</Typography>

        <Typography className={classes.paragraph}>
          Imię i nazwisko:{" "}
          <span className={classes.bold}> {activePatient.data.fullName}</span>
        </Typography>

        <Typography className={classes.paragraph}>
          Wiek:{" "}
          <span className={classes.bold}>
            {calculateAge(activePatient.data.date)}
          </span>
        </Typography>

        <Typography className={classes.paragraph}>
          Płeć: <span className={classes.bold}>{activePatient.data.sex}</span>
        </Typography>

        <Typography className={classes.paragraph}>
          Miasto:{" "}
          <span className={classes.bold}>{activePatient.data.city}</span>
        </Typography>

        <Typography className={classes.paragraph}>
          Numer kontaktowy:{" "}
          <span className={classes.bold}>
            {activePatient.data.telephoneNumber}
          </span>
        </Typography>
      </Paper>

      <Paper className={classes.root}>
        <Typography className={classes.header}>
          Szczegóły wywiadu żywieniowego
        </Typography>

        {activePatient.data.interview ? (
          <Typography className={classes.paragraph}>Szczegóły</Typography>
        ) : (
          <Typography className={classes.paragraph}>
            Wywiad żywieniowy nie został jeszcze przeprowadzony
          </Typography>
        )}
      </Paper>
    </div>
  );
}

DataDisplay.propTypes = {
  activePatient: PropTypes.object.isRequired
};
