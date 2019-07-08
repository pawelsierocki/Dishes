import React from "react";

const DishDetails = props => {
  const { dish } = props;

  const ingredients = dish.fullDescription.split("\n").map((el, index) => (
    <div key={index}>
      <p>{el}</p>
    </div>
  ));

  return (
    <>
      <h1>{dish.title}</h1>
      <p>{dish.shortDescription}</p>
      <p>{ingredients}</p>
    </>
  );
};

export default DishDetails;
