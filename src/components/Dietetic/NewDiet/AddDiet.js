import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Calendar from "./Calendar";
import GoBack from "../../UI/GoBack";
import DayPaper from "./DayPaper";
import MacroPaper from "./MacroPaper";
import FullDialog from "../../UI/FullDialog";
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
    marginTop: "2rem",
    boxSizing: "border-box",
    display: "flex"
  },
  day: {
    width: "50%"
  },
  macro: {
    width: "50%",
    marginLeft: "1rem"
  },
  dayContainer: {
    display: "flex",
    marginBottom: "2rem"
  },
  calendar: {
    width: "100%"
  }
});

const AddDiet = props => {
  const classes = useStyles();

  const [startDate, setStartDate] = React.useState(null);
  const [days, setDays] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [dayNumber, setDayNumber] = React.useState(null);
  const [monthName, setMonth] = React.useState(null);

  useEffect(() => {
    if (props.activePatient) {
      props.setActivePage(
        `Dietetyk - Pacjenci - ${props.activePatient.data.fullName} - Dodaj nową dietę`
      );
    }
  }, []);

  function onChange(startTime, endTime) {
    setStartDate(startTime);

    if (startTime && endTime) {
      setDays(
        Math.ceil(Math.abs(endTime - startTime) / (1000 * 60 * 60 * 24) + 1)
      );
    } else {
      setDays(0);
      setDayNumber(null);
      setMonth(null);
    }
  }

  function renderDays(classes) {
    let toRender = [];
    let currentDate = new Date(startDate);
    let nextDate = new Date(currentDate);

    for (let i = 0; i < days; i++) {
      let number = nextDate.getDate();
      let mnthName = MONTH_LABELS[nextDate.getMonth()];

      toRender.push(
        <div className={classes.dayContainer} key={i}>
          <div
            className={classes.day}
            onClick={() => handleOpen(number, mnthName)}
          >
            <DayPaper
              dayName={DAY_LABELS[nextDate.getDay()]}
              dayNumber={nextDate.getDate()}
              monthName={MONTH_LABELS[nextDate.getMonth()]}
            />
          </div>
          <div className={classes.macro}>
            <MacroPaper dayNumber={number} />
          </div>
        </div>
      );

      nextDate.setDate(nextDate.getDate() + 1);
    }

    return toRender;
  }

  function handleOpen(dayNumber, monthName) {
    setOpen(true);
    setDayNumber(dayNumber);
    setMonth(monthName);
  }

  function handleClose() {
    setOpen(false);
  }

  return props.activePatient ? (
    <div className={classes.container}>
      <div className={classes.top}>
        <GoBack href={`/dietetic/patients/id/${props.activePatient.id}`} />
      </div>
      <div className={classes.inner}>
        <Calendar onChange={onChange} />
      </div>
      <div className={classes.bottom}>
        <div className={classes.calendar}>{renderDays(classes)}</div>
      </div>
      {open && (
        <FullDialog
          onClose={handleClose}
          dayNumber={dayNumber}
          month={monthName}
          ingredients={props.ingredients}
        />
      )}
    </div>
  ) : (
    <Redirect to={"/dietetic/patients/"} />
  );
};

const mapStateToProps = state => ({
  activePatient: state.userReducer.activePatient,
  ingredients: state.dishesReducer.ingredients
});

const mapDispatchToProps = dispatch => ({
  setActivePage: page => dispatch(setActivePage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDiet);
