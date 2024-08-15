import { all, fork } from "redux-saga/effects";
import { watchHandleLogin, watchHandleLogout } from "./authenticatication";
import { watchFetchExpenditures } from "./expenditures";
import {
  watchAddPlayer,
  watchDeletePlayer,
  watchFetchPlayers,
} from "./players";

export default function* rootSaga(): Generator {
  yield all([
    fork(watchHandleLogin),
    fork(watchHandleLogout),
    fork(watchFetchExpenditures),
    fork(watchFetchPlayers),
    fork(watchAddPlayer),
    fork(watchDeletePlayer),
  ]);
}
