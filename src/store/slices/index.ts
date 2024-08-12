import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./authentication";
import expenseReducer from "./expenditures";
import playersReducer from "./players";

const rootReducer = combineReducers({
  authentication: loginReducer,
  expense: expenseReducer,
  players: playersReducer,
});

export default rootReducer;
