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
} from "firebase/firestore";
import { db } from "../../../firebase";
import {
  fetchExpendituresFailure,
  fetchExpendituresRequest,
  fetchExpendituresSuccess,
  addExpenditureFailure,
  addExpenditureRequest,
  addExpenditureSuccess,
  editExpenditureRequest,
  editExpenditureFailure,
  editExpenditureSuccess,
  deleteExpenditureRequest,
  deleteExpenditureSuccess,
  deleteExpenditureFailure,
} from "../../slices/expenditures";
import { SAGA_ACTIONS } from "../actions";

export function* fetchCategoryMap(): Generator<
  any,
  Record<string, string>,
  any
> {
  const categorySnapshot = yield call(
    getDocs,
    collection(db, "expenseCategories")
  );

  const categoryMap: Record<string, string> = {};

  categorySnapshot.docs.forEach((doc: any) => {
    const data = doc.data();
    categoryMap[doc.id] = data.name;
  });

  return categoryMap;
}

function* addExpenditureSaga(action: {
  type: string;
  payload: TExpenditure;
}): Generator<any, void, any> {
  try {
    yield put(addExpenditureRequest());

    const categoryMap = yield* fetchCategoryMap();

    const timestamp = Timestamp.now();

    const docRef = yield call(addDoc, collection(db, "expenditures"), {
      ...action.payload,
      date: timestamp,
    });

    const newExpenditure = {
      ...action.payload,
      id: docRef.id,
      category: categoryMap[action.payload.categoryId] || "Unknown Category",
      date: timestamp.toDate().toLocaleDateString(),
    };

    yield put(addExpenditureSuccess(newExpenditure));
  } catch (error: any) {
    yield put(addExpenditureFailure(error.message));
  }
}

export function* watchAddExpenditure(): Generator {
  yield takeLatest(SAGA_ACTIONS.ADD_EXPENDITURE, addExpenditureSaga);
}

function* fetchExpendituresSaga(): Generator<any, void, any> {
  try {
    yield put(fetchExpendituresRequest());

    const categoryMap = yield* fetchCategoryMap();

    const querySnapshot = yield call(getDocs, collection(db, "expenditures"));

    const fetchedExpenditures: TExpenditure[] = querySnapshot.docs.map(
      (doc: any) => {
        const data = doc.data();
        return {
          id: doc.id,
          categoryId: data.categoryId,
          category: categoryMap[data.categoryId] || "Unknown Category",
          amount: data.amount,
          description: data.description,
          date: data.date.toDate().toLocaleDateString(),
        };
      }
    );

    yield put(fetchExpendituresSuccess(fetchedExpenditures));
  } catch (error: any) {
    yield put(fetchExpendituresFailure(error.message));
  }
}

export function* watchFetchExpenditures(): Generator {
  yield takeLatest(SAGA_ACTIONS.GET_EXPENDITURES, fetchExpendituresSaga);
}

function* editExpenditureSaga(action: {
  type: string;
  payload: TExpenditure;
}): Generator<any, void, any> {
  try {
    yield put(editExpenditureRequest());

    const categoryMap = yield* fetchCategoryMap();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { date, ...payloadWithoutDate } = action.payload;

    const updatedCategory =
      categoryMap[action.payload.categoryId] || "Unknown Category";
    const expenditureRef = doc(db, "expenditures", action.payload.id);

    yield call(() => updateDoc(expenditureRef, payloadWithoutDate));

    const updatedExpenditure = {
      ...action.payload,
      category: updatedCategory,
    };

    yield put(editExpenditureSuccess(updatedExpenditure));
  } catch (error: any) {
    yield put(editExpenditureFailure(error.message));
  }
}

export function* watchEditExpenditure(): Generator {
  yield takeLatest(SAGA_ACTIONS.EDIT_EXPENDITURE, editExpenditureSaga);
}

function* deleteExpenditureSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  try {
    yield put(deleteExpenditureRequest());

    const expenditureDoc = doc(db, "expenditures", action.payload);
    yield call(deleteDoc, expenditureDoc);

    yield put(deleteExpenditureSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteExpenditureFailure(error.message));
  }
}

export function* watchDeleteExpenditure(): Generator {
  yield takeLatest(SAGA_ACTIONS.DELETE_EXPENDITURE, deleteExpenditureSaga);
}
