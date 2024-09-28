import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./authentication";
import expenseReducer from "./expenditures";
import playersReducer from "./players";
import expenseCategoriesReducer from "./expense-categories";
import usersReducer from "./users";
import playersSalariesReducer from "./players-salaries";

const rootReducer = combineReducers({
  authentication: loginReducer,
  expense: expenseReducer,
  players: playersReducer,
  expenseCategory: expenseCategoriesReducer,
  users: usersReducer,
  playersSalaries: playersSalariesReducer,
});

export default rootReducer;
