import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface filterSliceState {
  category: number;
  sort: "rating" | "price" | "title";
  order: "desc" | "asc";
}

export type sortState = {
  name?: string;
  value: "rating" | "price" | "title";
  order: "desc" | "asc";
};

const initialState: filterSliceState = {
  category: 0,
  sort: "rating",
  order: "desc",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    changeSort: (state, action: PayloadAction<sortState>) => {
      state.sort = action.payload.value;
      state.order = action.payload.order;
    },
    setFilters: (state, action: PayloadAction<filterSliceState>) => {
      state.category = action.payload.category;
      state.sort = action.payload.sort;
      state.order = action.payload.order;
    },
  },
});

export const { changeCategory, changeSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
