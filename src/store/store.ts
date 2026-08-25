import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import locationReducer, { persistLocation } from "./slice/locationSlice";
import { injectStore } from "@/lib/axios";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistLocation),
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
