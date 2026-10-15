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

const loadInitialState = (): AuthState => {
  if (typeof window === "undefined") return initialState;
  try {
    const storedAuth = localStorage.getItem("roofin_auth");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      if (parsed.accessToken && parsed.user) {
        return {
          ...initialState,
          user: parsed.user,
          accessToken: parsed.accessToken,
          refreshToken: parsed.refreshToken || null,
          isAuthenticated: true,
        };
      }
    }
  } catch (e) {
    console.error("Failed to parse stored auth", e);
  }
  return initialState;
};

const persistAuth = (auth: { user: any; accessToken: string; refreshToken?: string | null }) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("roofin_auth", JSON.stringify(auth));
    } catch (e) {
      console.error("Failed to persist auth", e);
    }
  }
};

const removePersistedAuth = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("roofin_auth");
    } catch (e) {
      console.error("Failed to remove persisted auth", e);
    }
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(),
  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.verificationToken = null;
      state.isAuthenticated = true;
      persistAuth({
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      });
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
      if (state.accessToken) {
        persistAuth({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        });
      }
    },
    setVerificationToken(state, action) {
      state.verificationToken = action.payload;
    },
    tokensRefreshed(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      if (state.user) {
        persistAuth({
          user: state.user,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        });
      }
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
      removePersistedAuth();
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
      removePersistedAuth();
    },
  },
});

export const {
  setAuth,
  updateUser,
  setVerificationToken,
  tokensRefreshed,
  setRequiresOtp,
  setOtpState,
  clearOtpState,
  clearAuth,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
