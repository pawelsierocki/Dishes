import { combineReducers } from "redux";
import userReducer from "./user";
import dishesReducer from "./dishes";

export default combineReducers({
  userReducer: userReducer,
  dishesReducer: dishesReducer
});
