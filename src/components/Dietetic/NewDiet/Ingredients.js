import React, { useEffect } from "react";
import { connect } from "react-redux";

import IngredientsTable from "../../UI/IngredientsTable";

const Ingredients = props => {
  const [ingredients, setIngredients] = React.useState([]);

  useEffect(() => {
    setIngredients(props.ingredients);
  }, []);

  function handleChoose(ingredient) {
    props.onChoose(ingredient);
  }

  return <IngredientsTable dataSource={ingredients} onClick={handleChoose} />;
};

const mapStateToProps = state => ({
  ingredients: state.dishesReducer.ingredients
});

export default connect(
  mapStateToProps,
  null
)(Ingredients);
