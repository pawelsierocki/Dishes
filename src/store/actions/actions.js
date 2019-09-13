import {
  FETCH_CURRENT_USER,
  SET_CURRENT_DISH,
  SET_ACTIVE_PAGE,
  SET_INGREDIENTS,
  SET_ACTIVE_PATIENT,
  SET_SEARCH_QUERY
} from "../../constants/action-types";

export const fetchCurrentUserOnStart = payload => ({
  type: FETCH_CURRENT_USER,
  payload
});

export const setSelectedDish = payload => ({
  type: SET_CURRENT_DISH,
  payload
});

export const setActivePage = payload => ({
  type: SET_ACTIVE_PAGE,
  payload
});

export const setIngredients = payload => ({
  type: SET_INGREDIENTS,
  payload
});

export const setActivePatient = payload => ({
  type: SET_ACTIVE_PATIENT,
  payload
});

export const setSearchQuery = payload => ({
  type: SET_SEARCH_QUERY,
  payload
});
