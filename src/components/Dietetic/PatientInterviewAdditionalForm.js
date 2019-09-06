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

  handleChange = event => {
    this.setState(
      {
        [event.target.id]: event.target.value
      },
      () => console.log(this.state)
    );
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
