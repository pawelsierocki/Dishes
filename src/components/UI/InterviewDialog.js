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
          {"Wywiad żywieniowy nie został jeszcze przeprowadzony"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Czy chcesz wypełnić ankietę żywieniową dla{" "}
            <span style={{ color: "#0066cc" }}>
              {activePatient.data.fullName}
            </span>
            {"?"}
            <p
              style={{
                fontSize: "10px",
                marginTop: "2rem",
                fontStyle: "italic"
              }}
            >
              Uwaga: Ankietę można wypełnić później klikając przycisk w
              szczegołach pacjenta.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "red" }}>
            Anuluj
          </Button>
          <Link
            to={`/dietetic/patients/id/${activePatient.id}/interview`}
            style={{ textDecoration: "none" }}
          >
            <Button
              onClick={handleClose}
              style={{ color: "#0066cc", fontWeight: "bold" }}
            >
              Tak
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
