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
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import {
  fetchInvestmentsFailure,
  fetchInvestmentsRequest,
  fetchInvestmentsSuccess,
  addInvestmentFailure,
  addInvestmentRequest,
  addInvestmentSuccess,
  editInvestmentRequest,
  editInvestmentFailure,
  editInvestmentSuccess,
  deleteInvestmentRequest,
  deleteInvestmentSuccess,
  deleteInvestmentFailure,
} from "../../slices/investments";
import { SAGA_ACTIONS } from "../actions";
import { notificationCenter } from "../../../app/utils/toast";

function* addInvestmentSaga(action: {
  type: string;
  payload: Omit<TInvestment, "id" | "dateAdded" | "investor">;
}): Generator<any, void, any> {
  try {
    yield put(addInvestmentRequest());

    const timestamp = Timestamp.now();

    const userDocRef = doc(db, "users", action.payload.userId);
    const userDoc = yield call(getDoc, userDocRef);
    const userData = userDoc.data();

    const docRef = yield call(addDoc, collection(db, "investments"), {
      ...action.payload,
      dateAdded: timestamp,
    });

    const newInvestment: TInvestment = {
      id: docRef.id,
      investor: userData?.firstName + " " + userData?.lastName || "",
      ...action.payload,
      dateAdded: timestamp.toDate().toLocaleDateString(),
    };

    yield put(addInvestmentSuccess(newInvestment));

    notificationCenter({
      message: "Investment has been added successfully.",
      status: "success",
      showConfirmButton: true,
      confirmButtonText: "Ok",
    });
  } catch (error: any) {
    yield put(addInvestmentFailure(error.message));

    notificationCenter({
      message: "Operation failed, please try again.",
      status: "error",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });
  }
}

export function* watchAddInvestment(): Generator {
  yield takeLatest(SAGA_ACTIONS.ADD_INVESTMENT, addInvestmentSaga);
}

function* fetchInvestmentsSaga(): Generator<any, void, any> {
  try {
    yield put(fetchInvestmentsRequest());

    const investmentsQuery = query(
      collection(db, "investments"),
      orderBy("dateAdded", "desc")
    );

    const querySnapshot = yield call(getDocs, investmentsQuery);

    const fetchedInvestments: TInvestment[] = [];

    for (const document of querySnapshot.docs) {
      const data = document.data();

      // Fetch user data
      const userDocRef = doc(db, "users", data.userId);
      const userDoc = yield call(getDoc, userDocRef);
      const userData = userDoc.data();

      fetchedInvestments.push({
        id: document.id,
        userId: data.userId,
        investor: userData?.firstName + " " + userData?.lastName || "",
        amount: data.amount,
        description: data.description,
        dateAdded: data.dateAdded.toDate().toLocaleDateString(),
      });
    }

    yield put(fetchInvestmentsSuccess(fetchedInvestments));
  } catch (error: any) {
    yield put(fetchInvestmentsFailure(error.message));
  }
}

export function* watchFetchInvestments(): Generator {
  yield takeLatest(SAGA_ACTIONS.GET_INVESTMENTS, fetchInvestmentsSaga);
}

function* editInvestmentSaga(action: {
  type: string;
  payload: TInvestment;
}): Generator<any, void, any> {
  try {
    yield put(editInvestmentRequest());

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, dateAdded, ...payloadWithoutIdAndDate } = action.payload;

    const investmentRef = doc(db, "investments", action.payload.id);
    yield call(() => updateDoc(investmentRef, payloadWithoutIdAndDate));

    yield put(editInvestmentSuccess(action.payload));

    notificationCenter({
      message: "Investment has been updated successfully.",
      status: "success",
      showConfirmButton: true,
      confirmButtonText: "Ok",
    });
  } catch (error: any) {
    yield put(editInvestmentFailure(error.message));

    notificationCenter({
      message: "Operation failed, please try again.",
      status: "error",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });
  }
}

export function* watchEditInvestment(): Generator {
  yield takeLatest(SAGA_ACTIONS.EDIT_INVESTMENT, editInvestmentSaga);
}

function* deleteInvestmentSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  try {
    yield put(deleteInvestmentRequest());
    const investmentDoc = doc(db, "investments", action.payload);
    yield call(deleteDoc, investmentDoc);
    yield put(deleteInvestmentSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteInvestmentFailure(error.message));
  }
}

export function* watchDeleteInvestment(): Generator {
  yield takeLatest(SAGA_ACTIONS.DELETE_INVESTMENT, deleteInvestmentSaga);
}
