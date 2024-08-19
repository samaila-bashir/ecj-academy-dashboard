import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExpenseCategoriesState {
  categories: TExpenseCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseCategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const expenseCategoriesSlice = createSlice({
  name: "expenseCategories",
  initialState,
  reducers: {
    fetchCategoriesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<TExpenseCategory[]>) {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addCategoryRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addCategorySuccess(state, action: PayloadAction<TExpenseCategory>) {
      state.loading = false;
      state.categories.push(action.payload);
    },
    addCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editCategoryRequest(state) {
      state.loading = true;
      state.error = null;
    },
    editCategorySuccess(state, action: PayloadAction<TExpenseCategory>) {
      state.loading = false;
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    editCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCategoryRequest(state) {
      state.loading = true;
    },
    deleteCategorySuccess(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
      state.loading = false;
    },
    deleteCategoryFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  addCategoryRequest,
  addCategorySuccess,
  addCategoryFailure,
  editCategoryRequest,
  editCategorySuccess,
  editCategoryFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
} = expenseCategoriesSlice.actions;

export default expenseCategoriesSlice.reducer;
