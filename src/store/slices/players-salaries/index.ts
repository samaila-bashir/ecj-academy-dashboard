import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IPlayerSalaryState {
  playersSalaries: TPlayerSalary[];
  playerSalary: TPlayerSalary | null;
  loading: boolean;
  error: string | null;
}

const defaultState: IPlayerSalaryState = {
  playersSalaries: [],
  playerSalary: null,
  loading: false,
  error: null,
};

const playerSalariesSlice = createSlice({
  name: "playerSalaries",
  initialState: defaultState,
  reducers: {
    addPlayerSalaryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addPlayerSalarySuccess: (
      state,
      action: PayloadAction<{ playerSalary: TPlayerSalary }>
    ) => {
      state.loading = false;
      state.playersSalaries.unshift(action.payload.playerSalary);
      state.error = null;
    },
    addPlayerSalaryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPlayerSalaryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPlayerSalarySuccess: (
      state,
      action: PayloadAction<{ playerSalary: TPlayerSalary }>
    ) => {
      state.loading = false;
      state.playerSalary = action.payload.playerSalary;
      state.error = null;
    },
    fetchPlayerSalaryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllPlayerSalariesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllPlayerSalariesSuccess: (
      state,
      action: PayloadAction<TPlayerSalary[]>
    ) => {
      state.loading = false;
      state.playersSalaries = action.payload;
      state.error = null;
    },
    fetchAllPlayerSalariesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePlayerSalaryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updatePlayerSalarySuccess: (
      state,
      action: PayloadAction<{
        playerSalaryId: string;
        data: Partial<TPlayerSalary>;
      }>
    ) => {
      state.loading = false;
      const index = state.playersSalaries.findIndex(
        (playerSalary) => playerSalary.id === action.payload.playerSalaryId
      );
      if (index !== -1) {
        state.playersSalaries[index] = {
          ...state.playersSalaries[index],
          ...action.payload.data,
        };
      }
      state.error = null;
    },
    updatePlayerSalaryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePlayerSalaryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletePlayerSalarySuccess: (
      state,
      action: PayloadAction<{ playerSalaryId: string }>
    ) => {
      state.loading = false;
      state.playersSalaries = state.playersSalaries.filter(
        (playerSalary) => playerSalary.id !== action.payload.playerSalaryId
      );
      state.error = null;
    },
    deletePlayerSalaryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addPlayerSalaryRequest,
  addPlayerSalarySuccess,
  addPlayerSalaryFailure,
  fetchPlayerSalaryRequest,
  fetchPlayerSalarySuccess,
  fetchPlayerSalaryFailure,
  fetchAllPlayerSalariesRequest,
  fetchAllPlayerSalariesSuccess,
  fetchAllPlayerSalariesFailure,
  updatePlayerSalaryRequest,
  updatePlayerSalarySuccess,
  updatePlayerSalaryFailure,
  deletePlayerSalaryRequest,
  deletePlayerSalarySuccess,
  deletePlayerSalaryFailure,
} = playerSalariesSlice.actions;

export default playerSalariesSlice.reducer;
