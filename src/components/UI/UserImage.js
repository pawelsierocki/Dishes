import React from "react";
import PropTypes from "prop-types";

const UserImage = props => {
  const { userPhoto, scale } = props;

  return <img src={userPhoto} alt="photoURL" className={scale} />;
};

UserImage.propTypes = {
  userPhoto: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired
};

export default UserImage;
