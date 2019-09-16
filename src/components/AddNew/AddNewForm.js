import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/icons/Send";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import MultiSelect from "../UI/MultiSelect";

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
    width: "auto"
  },
  rightIcon: {
    marginLeft: "1rem",
    fontSize: "1.2rem"
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
  },
  input: {
    display: "none"
  }
});

class AddNewForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      shortDescription: "",
      ingredients: [],
      favourite: false,
      isValidForm: false,
      validName: false,
      validShort: false,
      validFull: false,
      file: null
    };

    this.inputFile = React.createRef();
    this.image = React.createRef();
  }

  clearFields = () => {
    this.setState({
      name: "",
      shortDescription: "",
      ingredients: [],
      favourite: false,
      isValid: false,
      validName: false,
      validShort: false,
      validFull: false,
      file: null
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newDish = {
      title: this.state.name,
      shortDescription: this.state.shortDescription,
      ingredients: this.state.ingredients,
      favourite: this.state.favourite
    };

    this.props.handleAddNew(newDish, this.state.file);

    this.clearFields();
  };

  handleImageChange = ev => {
    if (ev.target.files[0]) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(ev.target.files[0]);

      fileReader.onload = e => {
        this.image.current.src = e.currentTarget.result;
      };
    }
  };

  componentDidMount() {
    if (this.props.items) {
      this.inputFile.current.addEventListener(
        "change",
        ev => this.handleImageChange(ev),
        false
      );
    }
  }

  componentWillUnmount() {
    if (this.props.items) {
      this.inputFile.current.removeEventListener(
        "change",
        ev => this.handleImageChange(ev),
        false
      );
    }
  }

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
    this.setState(state => {
      return {
        ...state,
        favourite: !state.favourite
      };
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
      case "ingredients": {
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

  handleFileChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  setChangeIngredients = ingredients => {
    this.setState(
      {
        ingredients
      },
      () => this.validateForm("ingredients", ingredients)
    );
  };

  render() {
    const { classes } = this.props;

    const { file } = this.state;

    return this.props.items ? (
      <div className={classes.container}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
          className={classes.form}
        >
          <TextField
            id="name"
            label="Nazwa dania"
            placeholder="Nazwa nie powinna być dłuższa niż 50 znaków"
            className={classes.textField}
            variant="filled"
            fullWidth
            value={this.state.name}
            onChange={this.handleChange}
          />
          <TextField
            id="shortDescription"
            label="Krótki opis dania"
            placeholder="Maksymalnie 250 znaków"
            className={classes.textField}
            variant="filled"
            fullWidth
            value={this.state.shortDescription}
            onChange={this.handleChange}
          />
          <MultiSelect
            className={classes.textField}
            items={this.props.items}
            onChangeIngredients={this.setChangeIngredients}
            id="ingredients"
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
            label="Dodaj do ulubionych"
            className={classes.checkbox}
          />
          {file && <img ref={this.image} alt="miniature" />}
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={this.handleFileChange}
            ref={this.inputFile}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              className={classes.button}
            >
              {!file ? `Dodaj zdjęcie` : `${file.name}`}
            </Button>
          </label>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!this.state.isValid}
          >
            Dodaj danie
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </div>
    ) : (
      <Redirect to={"/list"} />
    );
  }
}

AddNewForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAddNew: PropTypes.func.isRequired
};

export default withStyles(styles)(AddNewForm);
