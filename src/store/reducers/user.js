import * as actionTypes from "../../constants/action-types";

const initialState = {
  user: ""
};

const fetchCurrentUserOnStart = (state, payload) => ({
  ...state,
  ...payload
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CURRENT_USER:
      return fetchCurrentUserOnStart(state, action.payload);
    default:
      return state;
  }
};

export default userReducer;
