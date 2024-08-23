import { all, fork } from "redux-saga/effects";
import {
  watchHandleGoogleLogin,
  watchHandleLogin,
  watchHandleLogout,
} from "./authentication";
import {
  watchFetchExpenditures,
  watchAddExpenditure,
  watchEditExpenditure,
  watchDeleteExpenditure,
} from "./expenditures";
import {
  watchAddPlayer,
  watchDeletePlayer,
  watchEditPlayer,
  watchFetchPlayers,
} from "./players";
import {
  watchFetchCategories,
  watchAddCategory,
  watchEditCategory,
  watchDeleteCategory,
} from "./expense-categories";
import {
  watchFetchAllUsers,
  watchHandleAddUser,
  watchHandleDeleteUser,
  watchHandleFetchUser,
  watchHandleLinkUser,
  watchHandleUpdateUser,
} from "./users";
import {
  watchAddSalary,
  watchDeleteSalary,
  watchFetchAllSalaries,
  watchUpdateSalary,
} from "./salaries";

export default function* rootSaga(): Generator {
  yield all([
    fork(watchHandleLogin),
    fork(watchHandleLogout),
    watchHandleGoogleLogin(),
    fork(watchFetchExpenditures),
    fork(watchAddExpenditure),
    fork(watchEditExpenditure),
    fork(watchDeleteExpenditure),
    fork(watchFetchPlayers),
    fork(watchAddPlayer),
    fork(watchEditPlayer),
    fork(watchDeletePlayer),
    fork(watchFetchCategories),
    fork(watchAddCategory),
    fork(watchEditCategory),
    fork(watchDeleteCategory),
    fork(watchHandleAddUser),
    fork(watchHandleFetchUser),
    fork(watchFetchAllUsers),
    fork(watchHandleUpdateUser),
    fork(watchHandleDeleteUser),
    fork(watchHandleLinkUser),
    fork(watchAddSalary),
    fork(watchFetchAllSalaries),
    fork(watchUpdateSalary),
    fork(watchDeleteSalary),
  ]);
}
