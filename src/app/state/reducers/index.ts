import { combineReducers } from "redux";
import searchReducer from "./searchReducers";

const reducers = combineReducers({
  search: searchReducer,
});

export default reducers;
