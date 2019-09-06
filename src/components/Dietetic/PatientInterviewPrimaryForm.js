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

class PatientInterviewPrimaryForm extends Component {
  constructor() {
    super();

    this.state = {
      height: "",
      bodyWeight: "",
      bellyCircumference: "",
      hipCircumference: "",
      howManyDishes: "",
      job: "",
      ifSport: "",
      drugs: ""
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
          id="height"
          label="Wzrost"
          className={classes.textField}
          variant="filled"
          fullWidth
          onChange={this.handleChange}
          value={this.state.height}
        />

        <TextField
          id="bodyWeight"
          label="Masa ciała"
          className={classes.textField}
          variant="filled"
          fullWidth
          onChange={this.handleChange}
          value={this.state.bodyWeight}
        />

        <TextField
          id="bellyCircumference"
          label="Obwód brzucha"
          className={classes.textField}
          variant="filled"
          fullWidth
          onChange={this.handleChange}
          value={this.state.bellyCircumference}
        />

        <TextField
          id="hipCircumference"
          label="Obwód bioder"
          className={classes.textField}
          variant="filled"
          fullWidth
          onChange={this.handleChange}
          value={this.state.hipCircumference}
        />

        <TextField
          id="howManyDishes"
          label="Ilość posiłków spożywanych dziennie"
          className={classes.textField}
          variant="filled"
          fullWidth
          onChange={this.handleChange}
          value={this.state.howManyDishes}
        />

        <TextField
          id="job"
          label="Wykonywany zawód"
          className={classes.textField}
          variant="filled"
          fullWidth
          onChange={this.handleChange}
          value={this.state.job}
        />

        <TextField
          id="ifSport"
          label="Czy uprawia pan/i sport ? Jak często ?"
          className={classes.textField}
          variant="filled"
          fullWidth
          onChange={this.handleChange}
          value={this.state.ifSport}
        />

        <TextField
          id="drugs"
          label="Stosowane używki: papierosy, alkohol, kawa, mocna herbata ?"
          className={classes.textField}
          variant="filled"
          fullWidth
          onChange={this.handleChange}
          value={this.state.drugs}
        />
      </form>
    );
  }
}

export default withStyles(styles)(PatientInterviewPrimaryForm);
