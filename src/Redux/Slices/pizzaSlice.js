import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ category, sort, order }) => {
    const res = await axios.get(
      `https://635197659d64d7c71303cc99.mockapi.io/items?sortBy=${sort}&order=${order}&category=${
        category === 0 ? "" : category
      }`
    );
    return res.data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export default pizzaSlice.reducer;
