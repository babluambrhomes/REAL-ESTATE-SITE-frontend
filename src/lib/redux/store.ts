import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { injectStore } from "../axios";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
