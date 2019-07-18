import React from "react";
import { Link } from "react-router-dom";

import Divider from "@material-ui/core/Divider";

const NavigationUserPanel = props => {
  const { classes, user } = props;
  return (
    <>
      <Divider />
      <div className={classes.userLeft}>
        <Link to="/profile" onClick={props.handleChange}>
          <img
            src={user.photoURL}
            alt="user_photo"
            className={classes.userLeftPhoto}
          />
        </Link>
        <p>{user.displayName}</p>
      </div>
      <Divider />
    </>
  );
};

export default NavigationUserPanel;
