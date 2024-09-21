import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UserCredential } from "firebase/auth";

interface IAuthUser {
  token: string | null;
  user: UserCredential | null;
  isSuperAdmin: boolean;
  loading: boolean;
  error: string | null;
}

const defaultState: IAuthUser = {
  token: null,
  user: null,
  isSuperAdmin: false,
  loading: false,
  error: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: defaultState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: UserCredential;
        token: string;
        isSuperAdmin: boolean;
      }>
    ) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isSuperAdmin = action.payload.isSuperAdmin;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
    },
    logoutError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutError,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
