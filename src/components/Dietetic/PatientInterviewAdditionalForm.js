import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  },
  textField: {
    marginBottom: "1rem",
    width: "100%"
  }
};

class PatientInterviewAdditionalForm extends Component {
  constructor() {
    super();

    this.state = {
      diseasesOld: "",
      diseasesActual: ""
    };
  }

  componentDidMount = () => {
    const form = JSON.parse(localStorage.getItem("extendedForm"));

    this.setState({
      ...form
    });
  };

  componentWillUnmount = () => {
    localStorage.setItem("extendedForm", JSON.stringify({ ...this.state }));
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form}>
        <TextField
          id="diseasesOld"
          label="Przebyte choroby"
          className={classes.textField}
          variant="filled"
          fullWidth
          onChange={this.handleChange}
          value={this.state.diseasesOld}
        />

        <TextField
          id="diseasesActual"
          label="Aktualne choroby"
          className={classes.textField}
          variant="filled"
          fullWidth
          onChange={this.handleChange}
          value={this.state.diseasesActual}
        />
      </form>
    );
  }
}

export default withStyles(styles)(PatientInterviewAdditionalForm);
