/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";
import {
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  addCategoryFailure,
  addCategoryRequest,
  addCategorySuccess,
  editCategoryRequest,
  editCategoryFailure,
  editCategorySuccess,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
} from "../../slices/expense-categories";
import { SAGA_ACTIONS } from "../actions";
import { TExpenseCategory } from "../../../app/utils/types";

function* addCategorySaga(action: {
  type: string;
  payload: TExpenseCategory;
}): Generator<any, void, any> {
  try {
    yield put(addCategoryRequest());

    const docRef = yield call(
      addDoc,
      collection(db, "expenseCategories"),
      action.payload
    );

    const newCategory = {
      id: docRef.id,
      name: action.payload.name,
      description: action.payload.description,
    };

    yield put(addCategorySuccess(newCategory));
  } catch (error: any) {
    yield put(addCategoryFailure(error.message));
  }
}

export function* watchAddCategory(): Generator {
  yield takeLatest(SAGA_ACTIONS.ADD_EXPENSE_CATEGORY, addCategorySaga);
}

function* fetchCategoriesSaga(): Generator<any, void, any> {
  try {
    yield put(fetchCategoriesRequest());

    const querySnapshot = yield call(
      getDocs,
      collection(db, "expenseCategories")
    );

    const fetchedCategories: TExpenseCategory[] = querySnapshot.docs.map(
      (doc: any) => ({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
      })
    );

    yield put(fetchCategoriesSuccess(fetchedCategories));
  } catch (error: any) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

export function* watchFetchCategories(): Generator {
  yield takeLatest(SAGA_ACTIONS.GET_EXPENSES_CATEGORIES, fetchCategoriesSaga);
}

function* editCategorySaga(action: {
  type: string;
  payload: TExpenseCategory;
}): Generator<any, void, any> {
  try {
    yield put(editCategoryRequest());

    const categoryRef = doc(db, "expenseCategories", action.payload.id);
    yield call(() => updateDoc(categoryRef, { name: action.payload.name }));

    yield put(editCategorySuccess(action.payload));
  } catch (error: any) {
    yield put(editCategoryFailure(error.message));
  }
}

export function* watchEditCategory(): Generator {
  yield takeLatest(SAGA_ACTIONS.EDIT_EXPENSE_CATEGORY, editCategorySaga);
}

function* deleteCategorySaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  try {
    yield put(deleteCategoryRequest());

    const categoryDoc = doc(db, "expenseCategories", action.payload);
    yield call(deleteDoc, categoryDoc);

    yield put(deleteCategorySuccess(action.payload));
  } catch (error: any) {
    yield put(deleteCategoryFailure(error.message));
  }
}

export function* watchDeleteCategory(): Generator {
  yield takeLatest(SAGA_ACTIONS.DELETE_EXPENSE_CATEGORY, deleteCategorySaga);
}
