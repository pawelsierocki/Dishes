import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  box: {
    position: "absolute",
    fontSize: "9px",
    top: "5px",
    right: "-30px",
    transform: "rotate(45deg)",
    background: "#0066cc",
    padding: ".2rem 2rem .2rem 2rem",
    zIndex: "999"
  },
  boxSpan: {
    color: "#fff",
    letterSpacing: "1px"
  }
});

export default function NewDishlayer(props) {
  const { date } = props;
  const classes = styles();

  const render = date => {
    if (new Date(date).toDateString() === new Date().toDateString())
      return (
        <div className={classes.box}>
          <span className={classes.boxSpan}>NEW</span>
        </div>
      );

    return null;
  };

  return render(date);
}
