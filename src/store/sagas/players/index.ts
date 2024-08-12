/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import {
  fetchPlayersFailure,
  fetchPlayersRequest,
  fetchPlayersSuccess,
} from "../../slices/players";
import { SAGA_ACTIONS } from "../actions";
import { TPlayers } from "../../../app/utils/types";

function* fetchPlayersSaga(): Generator<any, void, any> {
  try {
    yield put(fetchPlayersRequest());

    const querySnapshot = yield call(getDocs, collection(db, "players"));

    const fetchedPlayers: TPlayers[] = querySnapshot.docs.map((doc: any) => {
      const data = doc.data();
      return {
        id: doc.id,
        firstName: data.firstName,
        lastName: data.lastName,
        stateOfOrigin: data.stateOfOrigin,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dob: data.dob,
        homeAddress: data.homeAddress,
        date: data.date.toDate().toLocaleDateString(),
      };
    });

    yield put(fetchPlayersSuccess(fetchedPlayers));
  } catch (error: any) {
    yield put(fetchPlayersFailure(error.message));
  }
}

export function* watchFetchPlayers(): Generator {
  yield takeLatest(SAGA_ACTIONS.GET_PLAYERS, fetchPlayersSaga);
}
