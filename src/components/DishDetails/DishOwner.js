import React from "react";
import PropTypes from "prop-types";

const DishOwner = props => {
  const { owner } = props;

  return (
    <>
      <h2>Opublikowano przez: </h2>
      <p>{owner.displayName}</p>
      <p>{owner.email}</p>
    </>
  );
};

DishOwner.propTypes = {
  owner: PropTypes.object.isRequired
};

export default DishOwner;
