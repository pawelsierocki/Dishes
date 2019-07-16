import React from "react";

const DishDetails = props => {
  const { dish } = props;
  const ingredients = dish.fullDescription
    .split("\n")
    .map((ingredient, index) => <p key={index}>{ingredient}</p>);

  return (
    <>
      <h1>{dish.title}</h1>
      <p>{dish.shortDescription}</p>
      {ingredients}
      {dish.imageUrl && <img src={dish.imageUrl} alt="dish" />}
    </>
  );
};

export default DishDetails;
