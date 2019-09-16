import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import Face from "@material-ui/icons/Face";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Mood from "@material-ui/icons/Mood";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

import PatientInterviewPrimaryForm from "../Dietetic/PatientInterviewPrimaryForm";
import PatientInterviewAdditionalForm from "../Dietetic/PatientInterviewAdditionalForm";

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: "#784af4"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <Face />,
    2: <GroupAddIcon />,
    3: <Mood />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: "3rem",
    width: "100%"
  },
  stepButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: "2rem"
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  }
}));

function getSteps() {
  return [
    "Informacje podstawowe",
    "Informacje dodatkowe",
    "Zaakceptuj i zapisz"
  ];
}

function getStepContent(step, classes) {
  switch (step) {
    case 0:
      return <PatientInterviewPrimaryForm />;
    case 1:
      return <PatientInterviewAdditionalForm />;
    case 2:
      return (
        <p className={classes.center}>
          Aby zapisać wywiad kliknij przycisk{" "}
          <span style={{ color: "#0066cc", marginLeft: ".2rem" }}>Zapisz wywiad</span>
        </p>
      );
    default:
      return "Unknown step";
  }
}

export default function CustomizedSteppers(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [submitted] = React.useState(false);

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleAdd() {
    props.handleAddInterview();
  }

  return (
    <Slide direction="up" in={!submitted} mountOnEnter unmountOnExit>
      <div className={classes.root}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
          style={{ backgroundColor: "#fafafa" }}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          <div className={classes.stepButtons}>
            <div className={classes.instructions}>
              {getStepContent(activeStep, classes)}
            </div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Cofnij
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={
                  activeStep !== steps.length - 1 ? handleNext : handleAdd
                }
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Zapisz wywiad" : "Dalej"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
