import { combineReducers } from "redux";
import shareables from "./shareable";
import kropotkin from "./kropotkin";
import auth from "./auth";
import categorization from "./categorization";
import location from "./location";

const rootReducer = combineReducers({
  auth,
  categorization,
  location,
  shareables,
  kropotkin
});

export default rootReducer;
