import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { injectStore } from "@/lib/axios";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
