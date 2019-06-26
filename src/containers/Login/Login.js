import React, { Component } from "react";

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

class Login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.loginContainer}>
        <LoginView login={this.props.login} />
      </div>
    );
  }
}

export default withStyles(styles)(Login);
