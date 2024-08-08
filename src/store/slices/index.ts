import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./authentication";
import expenseReducer from "./expenditures";

const rootReducer = combineReducers({
  authentication: loginReducer,
  expense: expenseReducer,
});

export default rootReducer;
