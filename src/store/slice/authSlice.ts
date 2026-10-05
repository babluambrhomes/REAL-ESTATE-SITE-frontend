import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "@/types";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  verificationToken: null,
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
       state.verificationToken = null;
      state.isAuthenticated = true;
    },
    setVerificationToken(state, action) {
      state.verificationToken = action.payload;
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
      state.verificationToken = null;
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.verificationToken = null;
      state.isAuthenticated = false;
      state.requiresOtp = false;
      state.otpIdentifier = null;
      state.otpPurpose = null;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.verificationToken = null;
      state.isAuthenticated = false;
      state.requiresOtp = false;
      state.otpIdentifier = null;
      state.otpPurpose = null;
    },
  },
});

export const {
  setAuth,
  setVerificationToken,
  tokensRefreshed,
  setRequiresOtp,
  setOtpState,
  clearOtpState,
  clearAuth,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
