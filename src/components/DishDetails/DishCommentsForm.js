import React, { Component } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

const styles = {
  container: {
    padding: "1rem",
    background: "#fff",
    boxShadow: "1px 2px 5px #000",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "5px"
  },
  form: {
    width: "100%"
  },
  button: {
    width: "14rem",
    marginTop: "2rem"
  },
  rightIcon: {
    marginLeft: "auto"
  },
  invalid: {
    color: "red",
    fontSize: "10px",
    fontStyle: "italic"
  },
  name: {
    width: "auto",
    alignSelf: "flex-start"
  }
};

class DishCommentsForm extends Component {
  constructor() {
    super();

    this.state = {
      message: "",
      invalid: false
    };
  }

  onChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  handleSubmit = () => {
    const { message } = this.state;
    if (message.replace(/\s/g, "").length) {
      this.props.addComment(this.state.message);

      this.setState({
        message: "",
        invalid: false
      });
    } else {
      this.setState({
        message: "",
        invalid: true
      });
    }
  };

  render() {
    const { classes, user } = this.props;

    const { invalid } = this.state;
    return (
      <div className={classes.container}>
        <TextField
          id="standard-textarea"
          multiline
          margin="normal"
          className={classes.name}
          disabled
          value={user.displayName}
        />
        <TextField
          id="standard-textarea"
          label="Dodaj komentarz.."
          multiline
          className={classes.form}
          margin="normal"
          value={this.state.message}
          onChange={this.onChange}
        />
        {invalid && <p className={classes.invalid}>Komentarz nie może być pusty</p>}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleSubmit}
        >
          Dodaj komentarz
          <SendIcon className={classes.rightIcon}>send</SendIcon>
        </Button>
      </div>
    );
  }
}

DishCommentsForm.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DishCommentsForm);
