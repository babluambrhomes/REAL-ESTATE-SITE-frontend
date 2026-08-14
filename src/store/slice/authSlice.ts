import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/lib/features/auth/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  requiresOtp: boolean;
  otpIdentifier: string | null;
  otpPurpose: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  requiresOtp: false,
  otpIdentifier: null,
  otpPurpose: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    tokensRefreshed(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setRequiresOtp(state, action) {
      state.requiresOtp = action.payload;
    },
    setOtpState(state, action) {
      state.otpIdentifier = action.payload.identifier;
      state.otpPurpose = action.payload.purpose;
    },
    clearOtpState(state) {
      state.requiresOtp = false;
      state.otpIdentifier = null;
      state.otpPurpose = null;
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.requiresOtp = false;
      state.otpIdentifier = null;
      state.otpPurpose = null;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.requiresOtp = false;
      state.otpIdentifier = null;
      state.otpPurpose = null;
    },
  },
});

export const {
  setAuth,
  tokensRefreshed,
  setRequiresOtp,
  setOtpState,
  clearOtpState,
  clearAuth,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
