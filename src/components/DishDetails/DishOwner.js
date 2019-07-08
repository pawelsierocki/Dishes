import React from "react";

const DishOwner = props => {
  const { owner } = props;

  return (
    <>
      <h2>Posted by: </h2>
      <p>{owner.displayName}</p>
      <p>{owner.email}</p>
    </>
  );
};

export default DishOwner;
