import React from "react";
import PropTypes from "prop-types";
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
          <UserImage userPhoto={user.photoURL} scale={classes.userLeftPhoto} />
        </Link>
        <p>{user.displayName}</p>
      </div>
      <Divider />
    </>
  );
};

NavigationUserPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default NavigationUserPanel;
