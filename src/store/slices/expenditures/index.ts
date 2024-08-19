import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExpendituresState {
  expenditures: TExpenditure[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpendituresState = {
  expenditures: [],
  loading: false,
  error: null,
};

const expendituresSlice = createSlice({
  name: "expenditures",
  initialState,
  reducers: {
    fetchExpendituresRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchExpendituresSuccess(state, action: PayloadAction<TExpenditure[]>) {
      state.loading = false;
      state.expenditures = action.payload;
    },
    fetchExpendituresFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addExpenditureRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addExpenditureSuccess(state, action: PayloadAction<TExpenditure>) {
      state.loading = false;
      state.expenditures.push(action.payload);
    },
    addExpenditureFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editExpenditureRequest(state) {
      state.loading = true;
      state.error = null;
    },
    editExpenditureSuccess(state, action: PayloadAction<TExpenditure>) {
      state.loading = false;
      const index = state.expenditures.findIndex(
        (expenditure) => expenditure.id === action.payload.id
      );
      if (index !== -1) {
        state.expenditures[index] = action.payload;
      }
    },
    editExpenditureFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteExpenditureRequest(state) {
      state.loading = true;
    },
    deleteExpenditureSuccess(state, action: PayloadAction<string>) {
      state.expenditures = state.expenditures.filter(
        (expenditure) => expenditure.id !== action.payload
      );
      state.loading = false;
    },
    deleteExpenditureFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchExpendituresRequest,
  fetchExpendituresSuccess,
  fetchExpendituresFailure,
  addExpenditureRequest,
  addExpenditureSuccess,
  addExpenditureFailure,
  editExpenditureRequest,
  editExpenditureSuccess,
  editExpenditureFailure,
  deleteExpenditureRequest,
  deleteExpenditureSuccess,
  deleteExpenditureFailure,
} = expendituresSlice.actions;

export default expendituresSlice.reducer;
