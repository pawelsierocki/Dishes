import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Calendar from "./Calendar";
import GoBack from "../../UI/GoBack";
import DayPaper from "./DayPaper";
import { setActivePage } from "../../../store/actions/actions";

const DAY_LABELS = [
  "Niedziela",
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota"
];

const MONTH_LABELS = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień"
];

const useStyles = makeStyles({
  top: {
    marginBottom: "2rem"
  },
  inner: {
    marginTop: "2rem"
  },
  bottom: {
    marginTop: "2rem"
  }
});

const AddDiet = props => {
  const classes = useStyles();

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [days, setDays] = React.useState(null);

  useEffect(() => {
    if (props.activePDatient) {
      props.setActivePage(
        `Dietetyk - Pacjenci - ${props.activePatient.data.fullName} - Dodaj nową dietę`
      );
    }
  }, []);

  function onChange(startTime, endTime) {
    setStartDate(startTime);
    setEndDate(endTime);

    if (startTime && endTime) {
      setDays(
        Math.ceil(Math.abs(endTime - startTime) / (1000 * 60 * 60 * 24) + 1)
      );
    } else {
      setDays(0);
    }
  }

  function renderDays() {
    let toRender = [];
    let currentDate = new Date(startDate);
    let nextDate = new Date(currentDate);

    for (let i = 0; i < days; i++) {
      toRender.push(
        <DayPaper
          key={i}
          dayName={DAY_LABELS[nextDate.getDay()]}
          dayNumber={nextDate.getDate()}
          monthName={MONTH_LABELS[nextDate.getMonth()]}
        />
      );

      nextDate.setDate(nextDate.getDate() + 1);
    }

    return toRender;
  }

  return props.activePatient ? (
    <div className={classes.container}>
      <div className={classes.top}>
        <GoBack href={`/dietetic/patients/id/${props.activePatient.id}`} />
      </div>
      <div className={classes.inner}>
        <Calendar onChange={onChange} />
      </div>
      <div className={classes.bottom}>{renderDays()}</div>
    </div>
  ) : (
    <Redirect to={"/dietetic/patients/"} />
  );
};

const mapStateToProps = props => ({
  activePatient: props.userReducer.activePatient
});

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDiet);
