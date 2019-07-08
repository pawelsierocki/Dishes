import {
  FETCH_CURRENT_USER,
  SET_CURRENT_DISH
} from "../../constants/action-types";

export const fetchCurrentUserOnStart = payload => ({
  type: FETCH_CURRENT_USER,
  payload
});

export const setSelectedDish = payload => ({
  type: SET_CURRENT_DISH,
  payload
});
