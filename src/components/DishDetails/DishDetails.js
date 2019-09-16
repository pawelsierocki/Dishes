import React from "react";
import PropTypes from "prop-types";

const DishDetails = props => {
  const { dish } = props;
  const ingredients = dish.ingredients.map((ingredient, index) => (
    <p key={index}>{ingredient}</p>
  ));

  return (
    <>
      <h1>{dish.title}</h1>
      <p>{dish.shortDescription}</p>
      {ingredients}
      {dish.imageUrl && <img src={dish.imageUrl} alt="dish" />}
    </>
  );
};

DishDetails.propTypes = {
  dish: PropTypes.object.isRequired
};

export default DishDetails;
