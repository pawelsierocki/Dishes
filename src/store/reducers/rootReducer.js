import { combineReducers } from "redux";
import userReducer from "./user";

const initialState = {
  username: "fromInitial"
};

function rootReducer(state = initialState, action) {
  return state;
}

export default combineReducers({
  rootReducer: rootReducer,
  userReducer: userReducer
});
