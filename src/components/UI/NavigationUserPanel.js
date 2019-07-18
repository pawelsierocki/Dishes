import React from "react";
import { Link } from "react-router-dom";

import Divider from "@material-ui/core/Divider";

import UserImage from "./UserImage";

const NavigationUserPanel = props => {
  const { classes, user } = props;
  return (
    <>
      <Divider />
      <div className={classes.userLeft}>
        <Link to="/profile" onClick={props.handleChange}>
          <UserImage
            userPhoto={user.photoURL}
            scale={classes.userLeftPhoto}
          />
        </Link>
        <p>{user.displayName}</p>
      </div>
      <Divider />
    </>
  );
};

export default NavigationUserPanel;
