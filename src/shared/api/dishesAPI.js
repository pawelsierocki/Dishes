import axios from "axios";

import {
  ENDPOINT_DISH,
  ENDPOINT_INGREDIENTS,
  ENDPOINT_COMMENT,
  ENDPOINT_DISH_CHANGE
} from "../../constants/api";

export const getAllDishes = () => axios.get(ENDPOINT_DISH);
export const getAllIngredients = () => axios.get(ENDPOINT_INGREDIENTS);

export const getCommentsForDish = dishID => {
  const commentsEndPoint = ENDPOINT_COMMENT(dishID);

  return axios.get(commentsEndPoint);
};

export const addNewComment = (dishID, commentDetails) => {
  const commentsEndPoint = ENDPOINT_COMMENT(dishID);

  return axios.post(commentsEndPoint, commentDetails);
};

export const addNewDish = newDish => axios.post(ENDPOINT_DISH, newDish);

export const changeFavourite = (dishID, data) => {
  const dishEndPoint = ENDPOINT_DISH_CHANGE(dishID);

  return axios.put(dishEndPoint, data);
};

export const deleteDish = dishID => {
  const dishEndPoint = ENDPOINT_DISH_CHANGE(dishID);

  return axios.delete(dishEndPoint);
};
