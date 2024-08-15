/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import {
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { type PayloadAction } from "@reduxjs/toolkit";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutError,
  logoutSuccess,
} from "../../slices/authentication";
// import { ROUTES } from '../../../utils/const'
// import router from '../../../route.config'
import { SAGA_ACTIONS } from "../actions";
import { getFireBaseLoginErrorMessage } from "../../../app/utils/helpers";
// import { notificationCenter } from '../../../utils/toast'

interface IUser {
  email: string;
  password: string;
}

export function* watchHandleLogin(): Generator {
  yield takeLatest(SAGA_ACTIONS.LOGIN, handleLogin);
}

function* handleLogin(action: PayloadAction<IUser>): Generator {
  const { email, password } = action.payload;

  try {
    yield put(loginRequest());

    const userCredential = (yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    )) as UserCredential;

    const token: string = (yield call([
      userCredential.user,
      userCredential.user.getIdToken,
    ])) as string;

    yield put(loginSuccess({ user: userCredential, token }));
    // yield router.navigate(ROUTES.DASHBOARD)
  } catch (error: any) {
    const errorMessage = getFireBaseLoginErrorMessage(error.code);
    yield put(loginFailure(errorMessage));

    // notificationCenter({
    //     message: errorMessage,
    //     status: 'error',
    // })
  }
}

export function* watchHandleLogout(): Generator {
  yield takeEvery(SAGA_ACTIONS.LOGOUT, handleLogout);
}

function* handleLogout(): Generator {
  try {
    yield call(signOut, auth);
    yield put(logoutSuccess());
    // yield router.navigate(ROUTES.AUTHENTICATION)
  } catch (error: any) {
    yield put(logoutError(error.message));
  }
}
