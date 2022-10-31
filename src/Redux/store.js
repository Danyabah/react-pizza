import { configureStore } from "@reduxjs/toolkit";
import flterReducer from "./Slices/filterSlice";
import searchReducer from "./Slices/searchSlice";
import cartReducer from "./Slices/cartSlice";
import pizzaReducer from "./Slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter: flterReducer,
    search: searchReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});
