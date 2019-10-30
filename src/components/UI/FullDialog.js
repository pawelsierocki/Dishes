import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import AddMeal from "../Dietetic/NewDiet/AddMeal";
import Ingredients from "../Dietetic/NewDiet/Ingredients";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  dialogContainer: {
    display: "flex"
  },
  addMeal: {
    width: "50%",
    padding: "15px"
  },
  ingredients: {
    padding: "15px"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [picked, setPicked] = React.useState(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const onChoose = ingredient => {
    setPicked(ingredient);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.dayNumber} {props.month}
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              Zapisz
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.dialogContainer}>
          <div className={classes.addMeal}>
            <AddMeal picked={picked} />
          </div>
          <div className={classes.ingredients}>
            <Ingredients onChoose={onChoose} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
