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
  fetchAllSalariesFailure,
  fetchAllSalariesRequest,
  fetchAllSalariesSuccess,
  addSalaryFailure,
  addSalaryRequest,
  addSalarySuccess,
  updateSalaryRequest,
  updateSalaryFailure,
  updateSalarySuccess,
  deleteSalaryRequest,
  deleteSalarySuccess,
  deleteSalaryFailure,
} from "../../slices/salaries";
import { SAGA_ACTIONS } from "../actions";
import { notificationCenter } from "../../../app/utils/toast";

function* addSalarySaga(action: {
  type: string;
  payload: Omit<TSalary, "id" | "playerName" | "date">;
}): Generator<any, void, any> {
  try {
    const datePaid = new Date().toLocaleDateString("en-NG");

    yield put(addSalaryRequest());

    const playerDocRef = doc(db, "players", action.payload.playerId);
    const playerDoc = yield call(getDoc, playerDocRef);

    const playerData = playerDoc.data();
    const playerName = `${playerData.firstName} ${playerData.lastName}`;

    const docRef = yield call(addDoc, collection(db, "salaries"), {
      ...action.payload,
      datePaid: datePaid,
    });

    const newSalary = {
      id: docRef.id,
      playerName: playerName,
      ...action.payload,
      datePaid: datePaid,
    };

    yield put(addSalarySuccess({ salary: newSalary }));

    notificationCenter({
      message: "Salary has been added successfully.",
      status: "success",
      confirmButtonText: "Ok",
    });
  } catch (error: any) {
    yield put(addSalaryFailure(error.message));

    notificationCenter({
      message: "Operation failed, please try again.",
      status: "error",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });
  }
}

export function* watchAddSalary(): Generator {
  yield takeLatest(SAGA_ACTIONS.ADD_SALARY, addSalarySaga);
}

function* fetchAllSalariesSaga(): Generator<any, void, any> {
  try {
    yield put(fetchAllSalariesRequest());

    const salariesQuery = query(
      collection(db, "salaries"),
      orderBy("datePaid", "desc")
    );

    const salariesSnapshot = yield call(getDocs, salariesQuery);
    const fetchedSalaries: TSalary[] = salariesSnapshot.docs.map(
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

    const salariesWithPlayerNames = fetchedSalaries.map((salary) => {
      const player = players.find((p: TPlayers) => p.id === salary.playerId);
      return {
        id: salary.id,
        playerId: salary.playerId,
        playerName: player
          ? `${player.firstName} ${player.lastName}`
          : "Unknown Player",
        amount: salary.amount,
        datePaid: salary.datePaid,
      };
    });

    yield put(fetchAllSalariesSuccess(salariesWithPlayerNames));
  } catch (error: any) {
    yield put(fetchAllSalariesFailure(error.message));
  }
}

export function* watchFetchAllSalaries(): Generator {
  yield takeLatest(SAGA_ACTIONS.GET_SALARIES, fetchAllSalariesSaga);
}

function* updateSalarySaga(action: {
  type: string;
  payload: { id: string; data: Partial<TSalary> };
}): Generator<any, void, any> {
  try {
    yield put(updateSalaryRequest());

    const salaryRef = doc(db, "salaries", action.payload.id);
    yield call(() => updateDoc(salaryRef, action.payload));

    yield put(
      updateSalarySuccess({
        salaryId: action.payload.id,
        data: action.payload,
      })
    );

    notificationCenter({
      message: "Salary has been updated successfully.",
      status: "success",
      confirmButtonText: "Ok",
    });
  } catch (error: any) {
    yield put(updateSalaryFailure(error.message));

    notificationCenter({
      message: "Operaton failed, please try again.",
      status: "error",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });
  }
}

export function* watchUpdateSalary(): Generator {
  yield takeLatest(SAGA_ACTIONS.EDIT_SALARY, updateSalarySaga);
}

function* deleteSalarySaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  try {
    yield put(deleteSalaryRequest());

    const salaryDoc = doc(db, "salaries", action.payload);
    yield call(deleteDoc, salaryDoc);

    yield put(deleteSalarySuccess({ salaryId: action.payload }));
  } catch (error: any) {
    yield put(deleteSalaryFailure(error.message));
  }
}

export function* watchDeleteSalary(): Generator {
  yield takeLatest(SAGA_ACTIONS.DELETE_SALARY, deleteSalarySaga);
}
