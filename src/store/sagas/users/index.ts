/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  linkUserRequest,
  linkUserSuccess,
  linkUserFailure,
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
} from "../../slices/users";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  linkWithRedirect,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { getFireBaseLoginErrorMessage } from "../../../app/utils/helpers";
import { PayloadAction } from "@reduxjs/toolkit";
import { SAGA_ACTIONS } from "../actions";

function* handleAddUser(
  action: PayloadAction<IAddUserActionPayload>
): Generator {
  const { firstName, lastName, email, password } = action.payload;

  try {
    yield put(addUserRequest());

    const userCredential = (yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password
    )) as UserCredential;

    const user = userCredential.user;

    const newUser: IUser = {
      id: user.uid,
      firstName: firstName,
      lastName: lastName,
      email: user.email || "",
      password: password,
    };

    yield call(() => setDoc(doc(db, "users", user.uid), newUser));

    yield put(addUserSuccess({ user: newUser }));
  } catch (error: any) {
    const errorMessage = getFireBaseLoginErrorMessage(error.code);
    yield put(addUserFailure(errorMessage));
  }
}

export function* watchHandleAddUser(): Generator {
  yield takeLatest(SAGA_ACTIONS.ADD_USER, handleAddUser);
}

function* handleFetchUser(
  action: PayloadAction<IFetchUserActionPayload>
): Generator {
  const { userId } = action.payload;

  try {
    yield put(fetchUserRequest());

    const userRef = doc(db, "users", userId);
    const userDoc = (yield call(
      getDoc,
      userRef
    )) as DocumentSnapshot<DocumentData>;

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const user: IUser = {
        id: userId,
        email: userData?.email || "",
        password: userData?.password || "",
      };

      yield put(fetchUserSuccess({ user }));
    } else {
      throw new Error("User not found.");
    }
  } catch (error: any) {
    yield put(fetchUserFailure(error.message));
  }
}

export function* watchHandleFetchUser(): Generator {
  yield takeLatest(SAGA_ACTIONS.FETCH_USER, handleFetchUser);
}

function* handleFetchAllUsers(): Generator {
  try {
    yield put(fetchAllUsersRequest());

    const usersCollectionRef = collection(db, "users");

    const querySnapshot = (yield call(
      getDocs,
      usersCollectionRef
    )) as QuerySnapshot<DocumentData>;

    const users: IUserWithoutSensitiveData[] = querySnapshot.docs.map((doc) => {
      const userData = doc.data();
      return {
        id: userData.id || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
      };
    });

    yield put(fetchAllUsersSuccess(users));
  } catch (error: any) {
    yield put(fetchAllUsersFailure(error.message));
  }
}

export function* watchFetchAllUsers(): Generator {
  yield takeLatest(SAGA_ACTIONS.FETCH_USERS, handleFetchAllUsers);
}

function* handleUpdateUser(
  action: PayloadAction<IUpdateUserActionPayload>
): Generator {
  const { userId, data } = action.payload;

  try {
    yield put(updateUserRequest());

    const userRef = doc(db, "users", userId);
    yield call(() => updateDoc(userRef, data));

    yield put(updateUserSuccess({ userId, data }));
  } catch (error: any) {
    yield put(updateUserFailure(error.message));
  }
}

export function* watchHandleUpdateUser(): Generator {
  yield takeLatest(SAGA_ACTIONS.UPDATE_USER, handleUpdateUser);
}

function* handleDeleteUser(
  action: PayloadAction<IDeleteUserActionPayload>
): Generator {
  const { userId } = action.payload;

  try {
    yield put(deleteUserRequest());

    const userRef = doc(db, "users", userId);
    yield call(deleteDoc, userRef);

    yield put(deleteUserSuccess({ userId }));
  } catch (error: any) {
    yield put(deleteUserFailure(error.message));
  }
}

export function* watchHandleDeleteUser(): Generator {
  yield takeLatest(SAGA_ACTIONS.DELETE_USER, handleDeleteUser);
}

function* handleLinkUser(
  action: PayloadAction<ILinkUserActionPayload>
): Generator {
  const { email, password } = action.payload;

  try {
    yield put(linkUserRequest());

    const userCredential = (yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    )) as UserCredential;

    const provider = new GoogleAuthProvider();
    const linkedCredential = (yield call(
      linkWithRedirect,
      userCredential.user,
      provider
    )) as UserCredential;

    const linkedUser: IUser = {
      id: linkedCredential.user.uid,
      email: linkedCredential.user.email || "",
      password: password,
    };

    yield put(linkUserSuccess({ user: linkedUser }));
  } catch (error: any) {
    const errorMessage = getFireBaseLoginErrorMessage(error.code);
    yield put(linkUserFailure(errorMessage));
  }
}

export function* watchHandleLinkUser(): Generator {
  yield takeLatest(SAGA_ACTIONS.LINK_USER, handleLinkUser);
}
