import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { calculateAge } from "../../store/helpers/patients";

import AddButton from "../UI/AddButton";

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
  },
  buttonAdd: {
    width: "auto",
    height: "auto",
    borderRadius: 0,
    padding: "5px 15px",
    fontSize: "10px"
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

      {activePatient.data.interview && (
        <Paper className={classes.root}>
          <Typography className={classes.header}>
            Szczegóły wywiadu żywieniowego
          </Typography>

          <h4>Podstawowe informacje</h4>

          <Typography className={classes.paragraph}>
            Wzrost:{" "}
            <span className={classes.bold}>
              {activePatient.data.interview.height}
            </span>
          </Typography>

          <Typography className={classes.paragraph}>
            Waga:{" "}
            <span className={classes.bold}>
              {activePatient.data.interview.bodyWeight}
            </span>
          </Typography>

          <Typography className={classes.paragraph}>
            Obwód brzucha:{" "}
            <span className={classes.bold}>
              {activePatient.data.interview.bellyCircumference}
            </span>
          </Typography>

          <Typography className={classes.paragraph}>
            Obwód bioder:{" "}
            <span className={classes.bold}>
              {activePatient.data.interview.hipCircumference}
            </span>
          </Typography>

          <Typography className={classes.paragraph}>
            Ilość posiłków spożywanych dziennie:{" "}
            <span className={classes.bold}>
              {activePatient.data.interview.howManyDishes}
            </span>
          </Typography>

          <Typography className={classes.paragraph}>
            Wykonywany zawód:{" "}
            <span className={classes.bold}>
              {activePatient.data.interview.job}
            </span>
          </Typography>

          <Typography className={classes.paragraph}>
            Uprawiany sport / jak często:{" "}
            <span className={classes.bold}>
              {activePatient.data.interview.ifSport}
            </span>
          </Typography>

          <Typography className={classes.paragraph}>
            Stosowane używki:{" "}
            <span className={classes.bold}>
              {activePatient.data.interview.drugs}
            </span>
          </Typography>

          <h4>Dodatkowe informacje</h4>

          <Typography className={classes.paragraph}>
            Przebyte choroby:{" "}
            <span className={classes.bold}>
              {activePatient.data.interview.diseasesOld}
            </span>
          </Typography>

          <Typography className={classes.paragraph}>
            Aktualne choroby:{" "}
            <span className={classes.bold}>
              {activePatient.data.interview.diseasesActual}
            </span>
          </Typography>
        </Paper>
      )}

      {activePatient.data.interview && (
        <>
          <Paper className={classes.root}>
            <Typography className={classes.header}>Diety</Typography>

            <Typography className={classes.paragraph}>
              #1 Dieta do wyświetlenia
            </Typography>
          </Paper>

          <AddButton
            text={"Dodaj dietę"}
            href={"/dietetic/diet"}
            classes={classes.buttonAdd}
          />
        </>
      )}
    </div>
  );
}

DataDisplay.propTypes = {
  activePatient: PropTypes.object.isRequired
};
