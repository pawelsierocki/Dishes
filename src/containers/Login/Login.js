import React from "react";

import { withStyles } from "@material-ui/core/styles";

import LoginView from "../../components/LoginView";

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    background:
      "url(https://firebasestorage.googleapis.com/v0/b/reactproject-de081.appspot.com/o/background.jpg?alt=media&token=24c2b6f4-eeb9-43dc-8840-ee937fe192b6)",
    backgroundSize: "cover"
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
