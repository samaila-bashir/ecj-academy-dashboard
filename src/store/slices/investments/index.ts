import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InvestmentsState {
  investments: TInvestment[];
  loading: boolean;
  error: string | null;
}

const initialState: InvestmentsState = {
  investments: [],
  loading: false,
  error: null,
};

const investmentsSlice = createSlice({
  name: "investments",
  initialState,
  reducers: {
    fetchInvestmentsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchInvestmentsSuccess(state, action: PayloadAction<TInvestment[]>) {
      state.loading = false;
      state.investments = action.payload;
    },
    fetchInvestmentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addInvestmentRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addInvestmentSuccess(state, action: PayloadAction<TInvestment>) {
      state.loading = false;
      state.investments.unshift(action.payload);
    },
    addInvestmentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editInvestmentRequest(state) {
      state.loading = true;
      state.error = null;
    },
    editInvestmentSuccess(state, action: PayloadAction<TInvestment>) {
      state.loading = false;
      const index = state.investments.findIndex(
        (investment) => investment.id === action.payload.id
      );
      if (index !== -1) {
        state.investments[index] = action.payload;
      }
    },
    editInvestmentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteInvestmentRequest(state) {
      state.loading = true;
    },
    deleteInvestmentSuccess(state, action: PayloadAction<string>) {
      state.investments = state.investments.filter(
        (investment) => investment.id !== action.payload
      );
      state.loading = false;
    },
    deleteInvestmentFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchInvestmentsRequest,
  fetchInvestmentsSuccess,
  fetchInvestmentsFailure,
  addInvestmentRequest,
  addInvestmentSuccess,
  addInvestmentFailure,
  editInvestmentRequest,
  editInvestmentSuccess,
  editInvestmentFailure,
  deleteInvestmentRequest,
  deleteInvestmentSuccess,
  deleteInvestmentFailure,
} = investmentsSlice.actions;

export default investmentsSlice.reducer;
