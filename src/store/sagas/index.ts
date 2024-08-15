import { all, fork } from "redux-saga/effects";
import { watchHandleLogin, watchHandleLogout } from "./authentication";
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

export default function* rootSaga(): Generator {
  yield all([
    fork(watchHandleLogin),
    fork(watchHandleLogout),
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
  ]);
}
