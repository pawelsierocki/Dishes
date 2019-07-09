import React, { Component } from "react";

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
    width: "50%",
    marginTop: "2rem"
  },
  rightIcon: {
    marginLeft: "1rem"
  }
};

class DishCommentsForm extends Component {
  constructor() {
    super();

    this.state = {
      message: ""
    };
  }

  onChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  handleSubmit = () => {
    this.props.addComment(this.state.message);

    this.setState({
      message: ""
    });
  };

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.container}>
        <TextField
          id="standard-textarea"
          multiline
          margin="normal"
          className={classes.form}
          disabled
          value={user.displayName}
        />
        <TextField
          id="standard-textarea"
          label="Place your comment"
          placeholder="Type something..."
          multiline
          className={classes.form}
          margin="normal"
          value={this.state.message}
          onChange={this.onChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleSubmit}
        >
          Send
          <SendIcon className={classes.rightIcon}>send</SendIcon>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(DishCommentsForm);
