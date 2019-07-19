import { combineReducers } from "redux";
import userReducer from "./user";
import dishesReducer from "./dishes";
import notifierReducer from "./notifier";

export default combineReducers({
  userReducer,
  dishesReducer,
  notifierReducer
});
