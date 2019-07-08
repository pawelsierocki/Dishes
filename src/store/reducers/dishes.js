import * as actionTypes from "../../constants/action-types";

const initialState = {
  selectedDish: null
};

const setSelectedDish = (state, payload) => ({
  ...state,
  ...payload
});

const dishesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_DISH:
      return setSelectedDish(state, action.payload);
    default:
      return state;
  }
};

export default dishesReducer;
