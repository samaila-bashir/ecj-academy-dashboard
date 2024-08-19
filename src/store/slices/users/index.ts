import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  email: string;
}

interface IUserState {
  users: IUserWithoutSensitiveData[];
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const defaultState: IUserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    addUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess: (state, action: PayloadAction<{ user: IUser }>) => {
      state.loading = false;
      state.users.push(action.payload.user);
      state.error = null;
    },
    addUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<{ user: IUser }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllUsersSuccess: (
      state,
      action: PayloadAction<IUserWithoutSensitiveData[]>
    ) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    fetchAllUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (
      state,
      action: PayloadAction<{ userId: string; data: Partial<IUser> }>
    ) => {
      state.loading = false;
      const index = state.users.findIndex(
        (user) => user.id === action.payload.userId
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload.data };
      }
      state.error = null;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action: PayloadAction<{ userId: string }>) => {
      state.loading = false;
      state.users = state.users.filter(
        (user) => user.id !== action.payload.userId
      );
      state.error = null;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    linkUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    linkUserSuccess: (state, action: PayloadAction<{ user: IUser }>) => {
      state.loading = false;
      const index = state.users.findIndex(
        (user) => user.id === action.payload.user.id
      );
      if (index !== -1) {
        state.users[index] = action.payload.user;
      }
      state.error = null;
    },
    linkUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  linkUserRequest,
  linkUserSuccess,
  linkUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
