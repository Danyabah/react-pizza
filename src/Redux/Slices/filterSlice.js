import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sort: "rating",
  order: "desc",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
    changeSort: (state, action) => {
      state.sort = action.payload.value;
      state.order = action.payload.order;
    },
    setFilters: (state, action) => {
      state.category = Number(action.payload.category);
      state.sort = action.payload.sort?.value;
      state.order = action.payload.order?.order;
    },
  },
});

export const { changeCategory, changeSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
