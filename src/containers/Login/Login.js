import React from "react";

import { withStyles } from "@material-ui/core/styles";

import LoginView from "../../components/LoginView";

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    background: '#0066cc'
  }
};

const Login = props => {
  const { classes, login } = props;
  return (
    <div className={classes.container}>
      <LoginView login={login} />
    </div>
  );
};

export default withStyles(styles)(Login);
