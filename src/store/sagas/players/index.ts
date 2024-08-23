/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../firebase";
import {
  fetchPlayersFailure,
  fetchPlayersRequest,
  fetchPlayersSuccess,
  addPlayerFailure,
  addPlayerRequest,
  addPlayerSuccess,
  editPlayerRequest,
  editPlayerFailure,
  editPlayerSuccess,
  deletePlayerRequest,
  deletePlayerSuccess,
  deletePlayerFailure,
} from "../../slices/players";
import { SAGA_ACTIONS } from "../actions";
import { notificationCenter } from "../../../app/utils/toast";

function* addPlayerSaga(action: {
  type: string;
  payload: TPlayers;
}): Generator<any, void, any> {
  try {
    yield put(addPlayerRequest());

    const timestamp = Timestamp.now();

    const docRef = yield call(addDoc, collection(db, "players"), {
      ...action.payload,
      dateAdded: timestamp,
    });

    const newPlayer = {
      ...action.payload,
      id: docRef.id,
      dateAdded: timestamp.toDate().toLocaleDateString(),
    };

    yield put(addPlayerSuccess(newPlayer));

    notificationCenter({
      message: "Player has been added successfully.",
      status: "success",
      showConfirmButton: true,
      confirmButtonText: "Ok",
    });
  } catch (error: any) {
    yield put(addPlayerFailure(error.message));

    notificationCenter({
      message: "Operation failed, please try again.",
      status: "error",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });
  }
}

export function* watchAddPlayer(): Generator {
  yield takeLatest(SAGA_ACTIONS.ADD_PLAYER, addPlayerSaga);
}

function* fetchPlayersSaga(): Generator<any, void, any> {
  try {
    yield put(fetchPlayersRequest());

    const playersQuery = query(
      collection(db, "players"),
      orderBy("dateAdded", "desc")
    );

    const querySnapshot = yield call(getDocs, playersQuery);

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
        dateAdded: data.dateAdded.toDate().toLocaleDateString(),
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

function* editPlayerSaga(action: {
  type: string;
  payload: TPlayers;
}): Generator<any, void, any> {
  try {
    yield put(editPlayerRequest());

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { dateAdded, ...payloadWithoutDate } = action.payload;

    const playerRef = doc(db, "players", action.payload.id);
    yield call(() => updateDoc(playerRef, payloadWithoutDate));

    yield put(editPlayerSuccess(action.payload));

    notificationCenter({
      message: "Player has been updated successfully.",
      status: "success",
      showConfirmButton: true,
      confirmButtonText: "Ok",
    });
  } catch (error: any) {
    yield put(editPlayerFailure(error.message));

    notificationCenter({
      message: "Operation failed, please try again.",
      status: "error",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });
  }
}

export function* watchEditPlayer(): Generator {
  yield takeLatest(SAGA_ACTIONS.EDIT_PLAYER, editPlayerSaga);
}

function* deletePlayerSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  try {
    yield put(deletePlayerRequest());
    const playerDoc = doc(db, "players", action.payload);
    yield call(deleteDoc, playerDoc);
    yield put(deletePlayerSuccess(action.payload));
  } catch (error: any) {
    yield put(deletePlayerFailure(error.message));
  }
}

export function* watchDeletePlayer(): Generator {
  yield takeLatest(SAGA_ACTIONS.DELETE_PLAYER, deletePlayerSaga);
}
