import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/icons/Send";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: "1rem"
  },
  button: {
    margin: theme.spacing(1),
    marginTop: "2rem",
    width: "10rem"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: "5rem",
    alignItems: "center",
    width: "80%"
  },
  checkbox: {
    marginTop: "1rem"
  }
});

class AddNewForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      shortDescription: "",
      fullDescription: "",
      favourite: false,
      isValidForm: false,
      validName: false,
      validShort: false,
      validFull: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.handleAddNew(
      this.state.name,
      this.state.shortDescription,
      this.state.fullDescription,
      this.state.favourite
    );

    this.setState({
      name: "",
      shortDescription: "",
      fullDescription: "",
      favourite: false,
      isValid: false,
      validName: false,
      validShort: false,
      validFull: false
    });
  };

  handleChange = e => {
    e.persist();

    this.setState(
      {
        ...this.state,
        [e.target.id]: e.target.value
      },
      () => this.validateForm(e.target.id, e.target.value)
    );
  };

  onChangeCheckbox = () => {
    this.setState({
      ...this.state,
      favourite: !this.state.favourite
    });
  };

  validateForm = (field, val) => {
    switch (field) {
      case "name": {
        this.setState(
          {
            validName: val.length && val.length <= 50 ? true : false
          },
          () => this.checkIfValid()
        );
        break;
      }
      case "shortDescription": {
        this.setState(
          {
            validShort: val.length && val.length <= 250 ? true : false
          },
          () => this.checkIfValid()
        );
        break;
      }
      case "fullDescription": {
        this.setState(
          {
            validFull: val.length > 0 ? true : false
          },
          () => this.checkIfValid()
        );
        break;
      }
      default:
        return;
    }
  };

  checkIfValid = () => {
    const { validName, validShort, validFull } = this.state;

    this.setState({
      isValid: validName && validShort && validFull ? true : false
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
            id="name"
            label="Name of a dish"
            placeholder="Name should be no longer than 50 characters."
            className={classes.textField}
            variant="filled"
            fullWidth
            value={this.state.name}
            onChange={this.handleChange}
          />
          <TextField
            id="shortDescription"
            label="Short description"
            placeholder="Max. length 250 characters."
            className={classes.textField}
            variant="filled"
            fullWidth
            value={this.state.shortDescription}
            onChange={this.handleChange}
          />
          <TextField
            id="fullDescription"
            label="Full description"
            multiline
            className={classes.textField}
            variant="filled"
            fullWidth
            value={this.state.fullDescription}
            onChange={this.handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={this.state.favourite}
                onChange={this.onChangeCheckbox}
              />
            }
            label="Add to favourites"
            className={classes.checkbox}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!this.state.isValid}
          >
            Send
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(AddNewForm);
