/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import {
  fetchExpendituresFailure,
  fetchExpendituresRequest,
  fetchExpendituresSuccess,
} from "../../slices/expenditures";
import { TExpenditure } from "../../../app/pages/Expenditures";
import { SAGA_ACTIONS } from "../actions";

function* fetchExpendituresSaga(): Generator<any, void, any> {
  try {
    yield put(fetchExpendituresRequest());

    const querySnapshot = yield call(getDocs, collection(db, "expenditures"));

    const fetchedExpenditures: TExpenditure[] = querySnapshot.docs.map(
      (doc: any) => {
        const data = doc.data();
        return {
          id: doc.id,
          category: data.category,
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
