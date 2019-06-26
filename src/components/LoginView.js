import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
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
  }
});

class LoginView extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
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
              onClick={this.props.login}
            >
              Authenticate
            </Button>
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(LoginView);
