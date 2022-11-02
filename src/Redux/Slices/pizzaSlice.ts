import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { filterSliceState } from "./filterSlice";

export const fetchPizzas = createAsyncThunk<item[], filterSliceState>(
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
type item = {
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

enum StatusState {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

interface pizzaSliceState {
  items: item[];
  status: StatusState;
}

const initialState: pizzaSliceState = {
  items: [],
  status: StatusState.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = StatusState.LOADING;
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<item[]>) => {
        state.items = action.payload;
        state.status = StatusState.SUCCESS;
      }
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = StatusState.ERROR;
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = "loading";
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = "error";
  //   },
  // },
});

export default pizzaSlice.reducer;
