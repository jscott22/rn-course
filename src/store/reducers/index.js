import { combineReducers } from "redux";
import places from "./places";
import auth from "./auth";

export default combineReducers({
  places,
  auth
});
