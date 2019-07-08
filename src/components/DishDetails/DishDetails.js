import React from "react";

const DishDetails = props => {
  const { dish } = props;

  const ingredients = dish.fullDescription
    .split("\n")
    .map((el, index) => <p key={index}>{el}</p>);

  return (
    <>
      <h1>{dish.title}</h1>
      <p>{dish.shortDescription}</p>
      {ingredients}
      <img src={dish.imageUrl} alt="dish" />
    </>
  );
};

export default DishDetails;
