import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./authentication";
import expenseReducer from "./expenditures";
import playersReducer from "./players";
import expenseCategoriesReducer from "./expense-categories";

const rootReducer = combineReducers({
  authentication: loginReducer,
  expense: expenseReducer,
  players: playersReducer,
  expenseCategory: expenseCategoriesReducer,
});

export default rootReducer;
