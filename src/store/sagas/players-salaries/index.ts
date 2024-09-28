/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase";
import {
  fetchAllPlayerSalariesFailure,
  fetchAllPlayerSalariesRequest,
  fetchAllPlayerSalariesSuccess,
  addPlayerSalaryFailure,
  addPlayerSalaryRequest,
  addPlayerSalarySuccess,
  updatePlayerSalaryRequest,
  updatePlayerSalaryFailure,
  updatePlayerSalarySuccess,
  deletePlayerSalaryRequest,
  deletePlayerSalarySuccess,
  deletePlayerSalaryFailure,
} from "../../slices/players-salaries";
import { SAGA_ACTIONS } from "../actions";
import { notificationCenter } from "../../../app/utils/toast";

function* addPlayerSalarySaga(action: {
  type: string;
  payload: Omit<TPlayerSalary, "id" | "playerName" | "date">;
}): Generator<any, void, any> {
  try {
    const datePaid = new Date().toLocaleDateString("en-NG");

    yield put(addPlayerSalaryRequest());

    const playerDocRef = doc(db, "players", action.payload.playerId);
    const playerDoc = yield call(getDoc, playerDocRef);

    const playerData = playerDoc.data();
    const playerName = `${playerData.firstName} ${playerData.lastName}`;

    const docRef = yield call(addDoc, collection(db, "playerSalaries"), {
      ...action.payload,
      datePaid: datePaid,
    });

    const newPlayerSalary = {
      id: docRef.id,
      playerName: playerName,
      ...action.payload,
      datePaid: datePaid,
    };

    yield put(addPlayerSalarySuccess({ playerSalary: newPlayerSalary }));

    notificationCenter({
      message: "Player salary has been added successfully.",
      status: "success",
      showConfirmButton: true,
      confirmButtonText: "Ok",
    });
  } catch (error: any) {
    yield put(addPlayerSalaryFailure(error.message));

    notificationCenter({
      message: "Operation failed, please try again.",
      status: "error",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });
  }
}

export function* watchAddPlayerSalary(): Generator {
  yield takeLatest(SAGA_ACTIONS.ADD_PLAYER_SALARY, addPlayerSalarySaga);
}

function* fetchAllPlayerSalariesSaga(): Generator<any, void, any> {
  try {
    yield put(fetchAllPlayerSalariesRequest());

    const salariesQuery = query(
      collection(db, "playerSalaries"),
      orderBy("datePaid", "desc")
    );

    const salariesSnapshot = yield call(getDocs, salariesQuery);
    const fetchedPlayerSalaries: TPlayerSalary[] = salariesSnapshot.docs.map(
      (doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    const playersSnapshot = yield call(getDocs, collection(db, "players"));
    const players: TPlayers[] = playersSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const playerSalariesWithPlayerNames = fetchedPlayerSalaries.map(
      (playerSalary) => {
        const player = players.find(
          (p: TPlayers) => p.id === playerSalary.playerId
        );
        return {
          id: playerSalary.id,
          playerId: playerSalary.playerId,
          playerName: player
            ? `${player.firstName} ${player.lastName}`
            : "Unknown Player",
          amount: playerSalary.amount,
          datePaid: playerSalary.datePaid,
        };
      }
    );

    yield put(fetchAllPlayerSalariesSuccess(playerSalariesWithPlayerNames));
  } catch (error: any) {
    yield put(fetchAllPlayerSalariesFailure(error.message));
  }
}

export function* watchFetchAllPlayerSalaries(): Generator {
  yield takeLatest(
    SAGA_ACTIONS.GET_PLAYER_SALARIES,
    fetchAllPlayerSalariesSaga
  );
}

function* updatePlayerSalarySaga(action: {
  type: string;
  payload: { id: string; data: Partial<TPlayerSalary> };
}): Generator<any, void, any> {
  try {
    yield put(updatePlayerSalaryRequest());

    const salaryRef = doc(db, "playerSalaries", action.payload.id);
    yield call(() => updateDoc(salaryRef, action.payload));

    yield put(
      updatePlayerSalarySuccess({
        playerSalaryId: action.payload.id,
        data: action.payload,
      })
    );

    notificationCenter({
      message: "Player salary has been updated successfully.",
      status: "success",
      showConfirmButton: true,
      confirmButtonText: "Ok",
    });
  } catch (error: any) {
    yield put(updatePlayerSalaryFailure(error.message));

    notificationCenter({
      message: "Operaton failed, please try again.",
      status: "error",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });
  }
}

export function* watchUpdatePlayerSalary(): Generator {
  yield takeLatest(SAGA_ACTIONS.EDIT_PLAYER_SALARY, updatePlayerSalarySaga);
}

function* deletePlayerSalarySaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  try {
    yield put(deletePlayerSalaryRequest());

    const salaryDoc = doc(db, "playerSalaries", action.payload);
    yield call(deleteDoc, salaryDoc);

    yield put(deletePlayerSalarySuccess({ playerSalaryId: action.payload }));
  } catch (error: any) {
    yield put(deletePlayerSalaryFailure(error.message));
  }
}

export function* watchDeletePlayerSalary(): Generator {
  yield takeLatest(SAGA_ACTIONS.DELETE_PLAYER_SALARY, deletePlayerSalarySaga);
}
