import * as actionTypes from "../../constants/action-types";

const initialState = {
  user: "",
  activePage: ""
};

const fetchCurrentUserOnStart = (state, payload) => ({
  ...state,
  ...payload
});

const setActivePage = (state, payload) => ({
  ...state,
  activePage: payload
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CURRENT_USER:
      return fetchCurrentUserOnStart(state, action.payload);
    case actionTypes.SET_ACTIVE_PAGE:
      return setActivePage(state, action.payload);
    default:
      return state;
  }
};

export default userReducer;
