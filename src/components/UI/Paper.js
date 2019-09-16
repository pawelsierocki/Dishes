import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    display: "flex",
    alignItems: 'center',
    boxShadow: '0 0 5px #000'
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
  info: {
    marginLeft: "3rem"
  },
  paragraph: {
    marginTop: '.5rem'
  }
}));

export default function PaperSheet(props) {
  const classes = useStyles();

  return (
    <div>
      <Paper
        className={classNames(classes.root, [
          props.warning ? classes.warning : classes.normal
        ])}
      >
        <div>
          <WarningIcon className={classes.icon} />
        </div>

        <div className={classes.info}>
          <Typography variant="h5" component="h3">
            {props.title}
          </Typography>
          <Typography component="p" className={classes.paragraph}>{props.message}</Typography>{" "}
        </div>
      </Paper>
    </div>
  );
}
