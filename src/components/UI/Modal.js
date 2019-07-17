import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Modal(props) {
  const { open, dish, handleClick, handleRemove } = props;

  return (
    //TODO: universal modal component
    <div>
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete " + dish + "?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This proccess can not be revert. If you want to delete this dish
            press Delete button.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            Disagree
          </Button>
          <Button onClick={handleRemove} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
