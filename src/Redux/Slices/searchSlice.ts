import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const searchReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export default searchReducer.reducer;

export const { setSearch } = searchReducer.actions;
