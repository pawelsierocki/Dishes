import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Modal(props) {
  const { open, dish, handleClick, handleRemove, type } = props;
  let title = "",
    body = "";

  switch (type) {
    case "delete": {
      title = "Jesteś pewien, że chcesz usunąć " + dish + "?";
      body =
        "Proces ten nie może zostać odwrócony. Jeżeli nadal chcesz usunąć to danie wciśnij TAK";
      break;
    }

    default:
      return null;
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleRemove} color="primary" autoFocus>
            Tak
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  dish: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};
