import { createSlice } from "@reduxjs/toolkit";
import calculatePriceAndCount from "../../utils/calcPriceCount";
import getLSData from "../../utils/getLSData";
import { RootState } from "../store";

export type item = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  type: string;
  count: number;
  size: number;
};

interface cartSliceState {
  totalPrice: number;
  totalCount: number;
  items: item[];
}

const initialState: cartSliceState = {
  totalPrice: getLSData().totalPrice,
  items: getLSData().items,
  totalCount: getLSData().totalCount,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const currentItem = state.items.find(
        (obj) => obj.id === action.payload.id
      );
      if (currentItem) {
        currentItem.count++;
      } else state.items.push({ ...action.payload, count: 1 });
      calculatePriceAndCount(state);
    },
    decrement: (state, action) => {
      const currentItem = state.items.find(
        (obj) => obj.id === action.payload.id
      );
      if (currentItem) {
        currentItem.count--;
      }
      calculatePriceAndCount(state);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      calculatePriceAndCount(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCurrentPizza = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, decrement, deleteItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
