import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ISalaryState {
  salaries: TSalary[];
  salary: TSalary | null;
  loading: boolean;
  error: string | null;
}

const defaultState: ISalaryState = {
  salaries: [],
  salary: null,
  loading: false,
  error: null,
};

const salariesSlice = createSlice({
  name: "salaries",
  initialState: defaultState,
  reducers: {
    addSalaryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addSalarySuccess: (state, action: PayloadAction<{ salary: TSalary }>) => {
      state.loading = false;
      state.salaries.unshift(action.payload.salary);
      state.error = null;
    },
    addSalaryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSalaryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSalarySuccess: (state, action: PayloadAction<{ salary: TSalary }>) => {
      state.loading = false;
      state.salary = action.payload.salary;
      state.error = null;
    },
    fetchSalaryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllSalariesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllSalariesSuccess: (state, action: PayloadAction<TSalary[]>) => {
      state.loading = false;
      state.salaries = action.payload;
      state.error = null;
    },
    fetchAllSalariesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSalaryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSalarySuccess: (
      state,
      action: PayloadAction<{ salaryId: string; data: Partial<TSalary> }>
    ) => {
      state.loading = false;
      const index = state.salaries.findIndex(
        (salary) => salary.id === action.payload.salaryId
      );
      if (index !== -1) {
        state.salaries[index] = {
          ...state.salaries[index],
          ...action.payload.data,
        };
      }
      state.error = null;
    },
    updateSalaryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSalaryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSalarySuccess: (
      state,
      action: PayloadAction<{ salaryId: string }>
    ) => {
      state.loading = false;
      state.salaries = state.salaries.filter(
        (salary) => salary.id !== action.payload.salaryId
      );
      state.error = null;
    },
    deleteSalaryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addSalaryRequest,
  addSalarySuccess,
  addSalaryFailure,
  fetchSalaryRequest,
  fetchSalarySuccess,
  fetchSalaryFailure,
  fetchAllSalariesRequest,
  fetchAllSalariesSuccess,
  fetchAllSalariesFailure,
  updateSalaryRequest,
  updateSalarySuccess,
  updateSalaryFailure,
  deleteSalaryRequest,
  deleteSalarySuccess,
  deleteSalaryFailure,
} = salariesSlice.actions;

export default salariesSlice.reducer;
