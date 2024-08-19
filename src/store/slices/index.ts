import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./authentication";
import expenseReducer from "./expenditures";
import playersReducer from "./players";
import expenseCategoriesReducer from "./expense-categories";
import usersReducer from "./users";

const rootReducer = combineReducers({
  authentication: loginReducer,
  expense: expenseReducer,
  players: playersReducer,
  expenseCategory: expenseCategoriesReducer,
  users: usersReducer,
});

export default rootReducer;
