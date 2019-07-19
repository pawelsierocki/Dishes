import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    boxShadow: "0 0 100px white"
  },
  paragraph: {
    margin: "1rem"
  },
  title: {
    textAlign: "center",
    marginBottom: "4rem"
  },
  buttonLogin: {
    marginTop: "2rem",
    width: "100%"
  },
  loginContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    opacity: "0.9"
  }
});

const LoginView = props => {
  const { classes, login } = props;
  return (
    <div className={classes.loginContainer}>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h3" className={classes.title}>
          Login
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          This application is using google authentication.
        </Typography>
        <Typography component="p" className={classes.paragraph}>
          Click on the button below to login.
        </Typography>
        <Typography component="p">
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonLogin}
            onClick={login}
          >
            Authenticate
          </Button>
        </Typography>
      </Paper>
    </div>
  );
};

LoginView.propTypes = {
  login: PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(LoginView);
