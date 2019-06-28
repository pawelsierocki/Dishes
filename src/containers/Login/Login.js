import React from "react";

import { withStyles } from "@material-ui/core/styles";

import LoginView from "../../components/LoginView";

const styles = {
  loginContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  }
};

const Login = props => {
  const { classes, login } = props;
  return (
    <div className={classes.loginContainer}>
      <LoginView login={login} />
    </div>
  );
};

export default withStyles(styles)(Login);
