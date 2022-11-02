import { configureStore } from "@reduxjs/toolkit";
import flterReducer from "./Slices/filterSlice";
import searchReducer from "./Slices/searchSlice";
import cartReducer from "./Slices/cartSlice";
import pizzaReducer from "./Slices/pizzaSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: flterReducer,
    search: searchReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
