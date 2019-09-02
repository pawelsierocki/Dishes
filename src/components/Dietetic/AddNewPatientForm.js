import "date-fns";
import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/icons/Send";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FilledInput from "@material-ui/core/FilledInput";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  },
  textField: {
    marginBottom: "1rem",
    width: "100%"
  },
  button: {
    width: "170px",
    marginTop: "2rem"
  },
  rightIcon: {
    marginLeft: "auto",
    height: ".8em"
  },
  date: {
    display: "flex",
    alignSelf: "flex-start"
  }
});

class AddNewPatientForm extends Component {
  constructor() {
    super();

    this.state = {
      fullName: "",
      city: "",
      telephoneNumber: "",
      sex: "",
      date: new Date(),
      dateTouched: false,
      isValid: false
    };
  }

  handleDateChange = date => {
    this.setState(
      {
        date,
        dateTouched: true
      },
      () => this.validateForm()
    );
  };

  handleChange = ev => {
    this.setState(
      {
        [ev.target.id]: ev.target.value
      },
      () => this.validateForm()
    );
  };

  handleChangeSex = ev => {
    this.setState(
      {
        [ev.target.name]: ev.target.value
      },
      () => this.validateForm()
    );
  };

  validateForm = () => {
    const { fullName, city, telephoneNumber, sex, dateTouched } = this.state;

    if (
      fullName !== "" &&
      city !== "" &&
      telephoneNumber !== "" &&
      sex !== "" &&
      dateTouched !== false
    )
      this.setState({
        isValid: true
      });
  };

  handleSubmit = ev => {
    const { fullName, city, telephoneNumber, sex, date } = this.state;
    ev.preventDefault();
    this.props.handleAddPatient({ fullName, city, telephoneNumber, sex, date });
    this.clearFields();
  };

  clearFields = () => {
    this.setState({
      fullName: "",
      city: "",
      telephoneNumber: "",
      sex: "",
      date: new Date(),
      dateTouched: false,
      isValid: false
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
          className={classes.form}
        >
          <TextField
            id="fullName"
            label="Patient full name"
            placeholder="Type patient full name"
            className={classes.textField}
            variant="filled"
            fullWidth
            onChange={this.handleChange}
            value={this.state.fullName}
          />
          <TextField
            id="city"
            label="City"
            placeholder="City"
            className={classes.textField}
            variant="filled"
            fullWidth
            onChange={this.handleChange}
            value={this.state.city}
          />
          <TextField
            id="telephoneNumber"
            label="Telephone number"
            placeholder="Telephone number"
            className={classes.textField}
            variant="filled"
            fullWidth
            onChange={this.handleChange}
            value={this.state.telephoneNumber}
          />
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth
          >
            <InputLabel htmlFor="filled-age-simple">Sex</InputLabel>
            <Select
              value={this.state.sex}
              onChange={this.handleChangeSex}
              input={<FilledInput name="sex" id="filled-age-simple" />}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="mui-pickers-date"
              label="Birth date"
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              value={this.state.date}
              className={classes.date}
            />
          </MuiPickersUtilsProvider>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!this.state.isValid}
          >
            Add patient
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </div>
    );
  }
}

AddNewPatientForm.propTypes = {
  handleAddPatient: PropTypes.func.isRequired
};

export default withStyles(styles)(AddNewPatientForm);
