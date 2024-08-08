import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TExpenditure } from "../../../app/pages/Expenditures";

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
  },
});

export const {
  fetchExpendituresRequest,
  fetchExpendituresSuccess,
  fetchExpendituresFailure,
} = expendituresSlice.actions;

export default expendituresSlice.reducer;
