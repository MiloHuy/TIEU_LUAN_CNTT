import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slice/api/api.slice";
import authReducer from "../slice/auth/auth.slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
