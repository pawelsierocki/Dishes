import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(true);
  const { activePatient } = props;

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"It seem's that interview is not finished yet"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to finish interview for{" "}
            <span style={{ color: "#0066cc" }}>
              {activePatient.data.fullName}
            </span>{" "}
            now ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "red" }}>
            No
          </Button>
          <Link
            to={`/dietetic/patients/id/${activePatient.id}/interview`}
            style={{ textDecoration: "none" }}
          >
            <Button
              onClick={handleClose}
              style={{ color: "#0066cc", fontWeight: "bold" }}
            >
              Yes
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
