import { combineReducers } from "redux";
import places from "./places";
import auth from "./auth";
import ui from "./ui";

export default combineReducers({
  places,
  auth,
  ui
});
