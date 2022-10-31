import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
  totalCount: 0,
};

function calculatePriceAndCount(state) {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);
  state.totalCount = state.items.reduce((sum, obj) => {
    return sum + obj.count;
  }, 0);
}

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

export const selectCurrentPizza = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, decrement, deleteItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
