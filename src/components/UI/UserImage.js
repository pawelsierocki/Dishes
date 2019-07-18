import React from "react";

const UserImage = props => {
  const { userPhoto, scale } = props;

  return <img src={userPhoto} alt="photoURL" className={scale} />;
};

export default UserImage;
