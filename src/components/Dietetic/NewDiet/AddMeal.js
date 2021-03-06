import React, { useEffect } from "react";

import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import AddMealForm from "./AddMealForm";
import MakroElements from "./MakroElements";

const styles = () => ({
  container: {
    padding: "15px"
  },
  mealContainer: {
    margin: "1rem 0",
    padding: "1rem",
    border: "1px solid #f50057",
    transition: "all .5s",
    borderRadius: "3px",
    minHeight: "5rem",
    background: "#f50057",
    color: "#fff",
    "&:hover": {
      color: "#000",
      background: "#fff",
      cursor: "pointer"
    }
  },
  bottom: {
    marginTop: 25
  },
  textFieldIngredient: {
    display: "flex",
    alignItems: "center",
    marginBottom: "3rem"
  },
  button: {
    marginLeft: "auto"
  },
  warning: {
    fontSize: "12px",
    color: "#f50057",
    textAlign: "center"
  },
  ingredientBox: {
    display: "flex",
    alignItems: "center",
    background: "#f9f9f9",
    padding: "5px 20px"
  },
  macros: {
    display: "flex",
    alignItems: "center",
    background: "#f9f9f9",
    padding: "5px 20px"
  },
  macro: {
    marginLeft: "auto"
  },
  icon: {
    marginLeft: "2rem",
    color: "red",
    "&:hover": {
      cursor: "pointer"
    }
  },
  bold: {
    fontWeight: "bold"
  },
  ingredientContainer: {
    marginBottom: ".5rem"
  }
});

const AddMeal = props => {
  const { classes, picked } = props;

  const [newMeal, setNewMeal] = React.useState(false);
  const [meals, setMeals] = React.useState([]);
  const [choosen, setChoosen] = React.useState(null);
  const [choosenGrams, setChoosenGrams] = React.useState("");
  const [changed, setChanged] = React.useState(false);

  useEffect(() => {
    if (props.picked) {
      setChoosenGrams(picked.grams);
      setChanged(false);
    }
  }, [props.picked]);

  function handleSave(name) {
    setMeals(meals => [...meals, { name }]);
    setNewMeal(false);
  }

  const mealsRender = meals.map((meal, index) => {
    return (
      <div
        key={index}
        className={classes.mealContainer}
        onClick={() => setChoosen(meal)}
      >
        {meal.name}
      </div>
    );
  });

  function saveIngredient() {
    setMeals(
      meals.map(meal =>
        meal.name === choosen.name
          ? {
              ...meal,
              ingredients: meal.ingredients
                ? [...meal.ingredients, { ...picked, multiplier: choosenGrams }]
                : [{ ...picked, multiplier: choosenGrams }]
            }
          : meal
      )
    );
  }

  function removeIngredient(index) {
    setMeals(
      meals.map(meal =>
        meal.name === choosen.name
          ? {
              ...meal,
              ingredients: meal.ingredients.filter((ingredient, id) => {
                return index !== id;
              })
            }
          : meal
      )
    );
  }

  return (
    <>
      {newMeal ? (
        <div className={classes.container}>
          <AddMealForm onClose={() => setNewMeal(false)} onSave={handleSave} />
        </div>
      ) : choosen ? (
        <div className={classes.container}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => setChoosen(false)}
          >
            Powrót
          </Button>
          <div className={classes.bottom}>
            <h2 style={{ textAlign: "center" }}>{choosen.name}</h2>
          </div>
          {picked && (
            <>
              {changed && (
                <p className={classes.warning}>
                  Zmiany w tym składniku będą widoczne tylko w obrębie tego
                  posiłku
                </p>
              )}
              <div className={classes.textFieldIngredient}>
                {picked.name}
                <TextField
                  id="standard-full-width"
                  style={{ marginLeft: 25 }}
                  helperText="Gram"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={choosenGrams}
                  onChange={ev => {
                    setChoosenGrams(ev.target.value);
                    setChanged(true);
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={saveIngredient}
                >
                  Dodaj
                </Button>
              </div>
              {meals.map(
                meal =>
                  meal.name === choosen.name &&
                  meal.ingredients &&
                  meal.ingredients.map((ingredient, index) => {
                    return (
                      <div key={index} className={classes.ingredientContainer}>
                        <div className={classes.ingredientBox}>
                          <p className={classes.bold}>{ingredient.name}</p>
                          <TextField
                            id="standard-full-width"
                            style={{ marginLeft: "auto", width: 50 }}
                            helperText="Gram"
                            margin="normal"
                            InputLabelProps={{
                              shrink: true
                            }}
                            value={ingredient.multiplier}
                            disabled
                          />
                          <HighlightOffIcon
                            className={classes.icon}
                            onClick={() => removeIngredient(index)}
                          />
                        </div>
                        <div className={classes.macros}>
                          <p className={classes.macro}>
                            T:
                            {(
                              (ingredient.multiplier / ingredient.grams) *
                              ingredient.fat
                            ).toFixed(2)}{" "}
                          </p>

                          <p className={classes.macro}>
                            B:
                            {(
                              (ingredient.multiplier / ingredient.grams) *
                              ingredient.protein
                            ).toFixed(2)}{" "}
                          </p>

                          <p className={classes.macro}>
                            F:
                            {(
                              (ingredient.multiplier / ingredient.grams) *
                              ingredient.fiber
                            ).toFixed(2)}{" "}
                          </p>

                          <p className={classes.macro}>
                            W:
                            {(
                              (ingredient.multiplier / ingredient.grams) *
                              ingredient.carbohydrates
                            ).toFixed(2)}{" "}
                          </p>
                        </div>
                      </div>
                    );
                  })
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <div className={classes.container}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => setNewMeal(true)}
            >
              Dodaj nowe danie
            </Button>
            {mealsRender}
          </div>
          {meals && meals.length > 0 && (
            <div className={classes.makro}>
              <MakroElements meals={meals} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default withStyles(styles)(AddMeal);
