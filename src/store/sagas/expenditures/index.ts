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
import { notificationCenter } from "../../../app/utils/toast";

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
      dateAdded: timestamp,
    });

    const data = action.payload;

    const newExpenditure = {
      id: docRef.id,
      categoryId: data.categoryId,
      category: categoryMap[data.categoryId] || "Unknown Category",
      amount: data.amount,
      description: data.description,
      dateAdded: timestamp.toDate().toLocaleDateString(),
    };

    yield put(addExpenditureSuccess(newExpenditure));

    notificationCenter({
      message: "Expenditure has been added successfully.",
      status: "success",
      showConfirmButton: true,
      confirmButtonText: "Ok",
    });
  } catch (error: any) {
    yield put(addExpenditureFailure(error.message));

    notificationCenter({
      message: "Operation failed, please try again.",
      status: "error",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });
  }
}

export function* watchAddExpenditure(): Generator {
  yield takeLatest(SAGA_ACTIONS.ADD_EXPENDITURE, addExpenditureSaga);
}

function* fetchExpendituresSaga(): Generator<any, void, any> {
  try {
    yield put(fetchExpendituresRequest());

    const categoryMap = yield* fetchCategoryMap();

    const expendituresQuery = query(
      collection(db, "expenditures"),
      orderBy("dateAdded", "desc")
    );

    const querySnapshot = yield call(getDocs, expendituresQuery);

    const fetchedExpenditures: TExpenditure[] = querySnapshot.docs.map(
      (doc: any) => {
        const data = doc.data();
        return {
          id: doc.id,
          categoryId: data.categoryId,
          category: categoryMap[data.categoryId] || "Unknown Category",
          amount: data.amount,
          description: data.description,
          dateAdded: data.dateAdded.toDate().toLocaleDateString(),
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
    const { dateAdded, ...payloadWithoutDate } = action.payload;

    const updatedCategory =
      categoryMap[action.payload.categoryId] || "Unknown Category";
    const expenditureRef = doc(db, "expenditures", action.payload.id);

    yield call(() => updateDoc(expenditureRef, payloadWithoutDate));

    const updatedExpenditure = {
      ...action.payload,
      category: updatedCategory,
    };

    yield put(editExpenditureSuccess(updatedExpenditure));

    notificationCenter({
      message: "Expenditure has been updated successfully.",
      status: "success",
      showConfirmButton: true,
      confirmButtonText: "Ok",
    });
  } catch (error: any) {
    yield put(editExpenditureFailure(error.message));

    notificationCenter({
      message: "Operation failed, please try again.",
      status: "error",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });
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
