/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import {
  AuthError,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type UserCredential,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { type PayloadAction } from "@reduxjs/toolkit";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutError,
  logoutSuccess,
} from "../../slices/authentication";
import { SAGA_ACTIONS } from "../actions";
import { getFireBaseLoginErrorMessage } from "../../../app/utils/helpers";
import { NavigateFunction } from "react-router-dom";
import {
  doc,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

export function* watchHandleLogin(): Generator {
  yield takeLatest(SAGA_ACTIONS.LOGIN, handleLogin);
}

function* handleLogin(action: PayloadAction<ILoginActionPayload>): Generator {
  const { email, password } = action.payload.user;
  const { navigate } = action.payload;

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

    yield call(() => navigate("/dashboard"));
  } catch (error: any) {
    const errorMessage = getFireBaseLoginErrorMessage(error.code);
    yield put(loginFailure(errorMessage));
  }
}

// function* handleLogin(action: PayloadAction<ILoginActionPayload>): Generator {
//   const { email, password } = action.payload.user;
//   const { navigate } = action.payload;

//   try {
//     yield put(loginRequest());

//     const userCredential = (yield call(
//       signInWithEmailAndPassword,
//       auth,
//       email,
//       password
//     )) as UserCredential;

//     const token: string = (yield call([
//       userCredential.user,
//       userCredential.user.getIdToken,
//     ])) as string;

//     yield put(loginSuccess({ user: userCredential, token }));

//     yield call(() => navigate("/dashboard"));
//   } catch (error: any) {
//     const errorMessage = getFireBaseLoginErrorMessage(error.code);
//     yield put(loginFailure(errorMessage));
//   }
// }

export function* watchHandleGoogleLogin(): Generator {
  yield takeLatest(SAGA_ACTIONS.GOOGLE_LOGIN, handleGoogleLogin);
}

// function* handleGoogleLogin(
//   action: PayloadAction<{ navigate: NavigateFunction }>
// ): Generator {
//   const { navigate } = action.payload;

//   try {
//     yield put(loginRequest());

//     const provider = new GoogleAuthProvider();
//     const userCredential = (yield call(
//       signInWithPopup,
//       auth,
//       provider
//     )) as UserCredential;

//     // Check if user exists in Firestore
//     const userDocRef = doc(db, "users", userCredential.user.uid);
//     const userDoc = (yield call(
//       getDoc,
//       userDocRef
//     )) as DocumentSnapshot<DocumentData>;

//     if (userDoc.exists()) {
//       // If user exists, proceed with login
//       const token: string = (yield call([
//         userCredential.user,
//         userCredential.user.getIdToken,
//       ])) as string;

//       yield put(loginSuccess({ user: userCredential, token }));
//       navigate("/dashboard");
//     } else {
//       // User does not exist in Firestore
//       yield call(signOut, auth); // Sign out the user
//       yield call(deleteUser, userCredential.user); // Delete the user from Firebase Authentication
//       yield put(loginFailure("User not registered."));
//     }
//   } catch (error: any) {
//     const errorMessage = getFireBaseLoginErrorMessage(error.code);
//     yield put(loginFailure(errorMessage));
//   }
// }

function* handleGoogleLogin(
  action: PayloadAction<{ navigate: NavigateFunction }>
): Generator {
  const { navigate } = action.payload;

  try {
    yield put(loginRequest());

    // Initialize Google Provider
    const provider = new GoogleAuthProvider();
    const googleUserCredential = (yield call(
      signInWithPopup,
      auth,
      provider
    )) as UserCredential;

    // Extract Google Credential
    const googleCredential =
      GoogleAuthProvider.credentialFromResult(googleUserCredential);
    if (!googleCredential) {
      throw new Error("Failed to get Google credentials.");
    }

    // Check if user already exists in Firestore
    const userDocRef = doc(db, "users", googleUserCredential.user.uid);
    const userDoc = (yield call(
      getDoc,
      userDocRef
    )) as DocumentSnapshot<DocumentData>;

    if (userDoc.exists()) {
      // If the user exists, link the Google account if not already linked
      const isGoogleLinked = googleUserCredential.user.providerData.some(
        (p) => p.providerId === GoogleAuthProvider.PROVIDER_ID
      );

      if (!isGoogleLinked) {
        const currentUser = auth.currentUser;
        if (currentUser) {
          yield call(linkWithCredential, currentUser, googleCredential);
        }
      }

      // Proceed with login
      const token: string = (yield call([
        googleUserCredential.user,
        googleUserCredential.user.getIdToken,
      ])) as string;

      yield put(loginSuccess({ user: googleUserCredential, token }));
      navigate("/dashboard");
    } else {
      // Sign out and show error if the user is not registered
      yield call(signOut, auth);
      yield put(loginFailure("User not registered."));
    }
  } catch (error: any) {
    const authError = error as AuthError;
    const errorMessage = getFireBaseLoginErrorMessage(authError.code);
    yield put(loginFailure(errorMessage));
  }
}

// function* handleGoogleLogin(
//   action: PayloadAction<{ navigate: NavigateFunction }>
// ): Generator {
//   const { navigate } = action.payload;

//   try {
//     yield put(loginRequest());

//     const provider = new GoogleAuthProvider();
//     const userCredential = (yield call(
//       signInWithPopup,
//       auth,
//       provider
//     )) as UserCredential;

//     // Check if user exists in Firestore
//     const userDocRef = doc(db, "users", userCredential.user.uid);
//     const userDoc = (yield call(
//       getDoc,
//       userDocRef
//     )) as DocumentSnapshot<DocumentData>;

//     if (userDoc.exists()) {
//       // If user exists, proceed with login
//       const token: string = (yield call([
//         userCredential.user,
//         userCredential.user.getIdToken,
//       ])) as string;

//       yield put(loginSuccess({ user: userCredential, token }));
//       navigate("/dashboard");
//     } else {
//       yield call(signOut, auth);
//       yield put(loginFailure("User not registered."));
//     }
//   } catch (error: any) {
//     const errorMessage = getFireBaseLoginErrorMessage(error.code);
//     yield put(loginFailure(errorMessage));
//   }
// }

export function* watchHandleLogout(): Generator {
  yield takeEvery(SAGA_ACTIONS.LOGOUT, handleLogout);
}

function* handleLogout(
  action: PayloadAction<{ navigate: NavigateFunction }>
): Generator {
  const { navigate } = action.payload;

  try {
    yield call(signOut, auth);
    yield put(logoutSuccess());

    yield call(() => navigate("/dashboard"));
  } catch (error: any) {
    yield put(logoutError(error.message));
  }
}
