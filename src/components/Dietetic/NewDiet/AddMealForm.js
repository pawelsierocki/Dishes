import React, { useState } from "react";

import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = () => ({
  button: {
    marginLeft: "10px"
  },
  textField: {
    display: "inline-block"
  }
});

const AddMealForm = props => {
  const { classes } = props;

  const [name, setName] = React.useState("");

  function changeName(ev) {
    setName(ev.target.value);
  }

  return (
    <>
      <Button variant="contained" onClick={props.onClose}>
        Anuluj
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => {
          if (name.length) props.onSave(name);
        }}
      >
        Zapisz danie
      </Button>
      <TextField
        id="standard-full-width"
        label="Nazwa"
        style={{ marginTop: 25 }}
        margin="normal"
        fullWidth
        InputLabelProps={{
          shrink: true
        }}
        value={name}
        className={classes.textField}
        onChange={changeName}
      />
    </>
  );
};

export default withStyles(styles)(AddMealForm);
