import React from "react";

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
      title = "Are you sure you want to delete " + dish + "?";
      body =
        "This proccess can not be revert. If you want to delete this dish press Yes button.";
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
            No
          </Button>
          <Button onClick={handleRemove} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
