import React from "react";

const DishOwner = props => {
  const { owner } = props;

  console.log(owner);
  return (
    <>
      <p>{owner.displayName}</p>
      <p>{owner.email}</p>
    </>
  );
};

export default DishOwner;
