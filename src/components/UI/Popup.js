import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    display: "flex",
    alignItems: "center",
    boxShadow: "0 0 5px #000",
    "&:hover": {
      cursor: "pointer"
    }
  },
  warning: {
    background: "#FF7F7F",
    color: "#fff"
  },
  normal: {
    background: "#fff",
    color: "#000"
  },
  icon: {
    fontSize: "60px"
  },
  iconEdit: {
    fontSize: "35px",
    color: "#fff",
    transition: "all .5s",
    boxShadow: "-3px 0 0 transparent",
    padding: "5px",
    borderRadius: "50%",
    "&:hover": {
      cursor: "pointer",
      transform: "rotate(360deg)",
      boxShadow: "-3px 0 0 #fff"
    }
  },
  info: {
    marginLeft: "3rem"
  },
  paragraph: {
    marginTop: ".5rem"
  },
  edit: {
    marginLeft: "auto"
  },
  "@media only screen and (max-width: 600px)": {
    title: {
      fontSize: "14px"
    },
    paragraph: {
      fontSize: "10px"
    },
    icon: {
      fontSize: "40px"
    },
    info: {
      marginLeft: "2rem",
      marginRight: "2rem"
    }
  }
}));

export default function PaperSheet(props) {
  const classes = useStyles();

  const { activePatient } = props;

  return (
    <div>
      <Paper
        className={classNames(classes.root, [
          props.warning ? classes.warning : classes.normal
        ])}
      >
        {props.warning && (
          <div>
            <WarningIcon className={classes.icon} />
          </div>
        )}

        <div className={classes.info}>
          <Typography variant="h5" component="h3" className={classes.title}>
            {props.title}
          </Typography>
          <Typography component="p" className={classes.paragraph}>
            {props.message}
          </Typography>{" "}
        </div>

        {props.warning && (
          <div className={classes.edit}>
            <Link to={`/dietetic/patients/id/${activePatient.id}/interview`}>
              <EditIcon className={classes.iconEdit} />
            </Link>
          </div>
        )}
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  message: PropTypes.string.isRequired,
  warning: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  activePatient: PropTypes.object
};
