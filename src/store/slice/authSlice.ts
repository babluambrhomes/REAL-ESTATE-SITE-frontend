import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "@/types";

const initialState: AuthState = {
  user: null,
  workspaces: [],
  activeWorkspaceId: null,
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
          workspaces: Array.isArray(parsed.workspaces) ? parsed.workspaces : [],
          activeWorkspaceId: parsed.activeWorkspaceId ?? null,
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

type PersistedAuth = {
  user: unknown;
  workspaces: unknown[];
  activeWorkspaceId: string | null;
  accessToken: string;
  refreshToken?: string | null;
};

const persistAuth = (auth: PersistedAuth) => {
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
      state.workspaces = Array.isArray(action.payload.workspaces)
        ? action.payload.workspaces
        : [];
      state.activeWorkspaceId = action.payload.activeWorkspaceId ?? null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.verificationToken = null;
      state.isAuthenticated = true;
      persistAuth({
        user: action.payload.user,
        workspaces: state.workspaces,
        activeWorkspaceId: state.activeWorkspaceId,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      });
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
      if (state.accessToken) {
        persistAuth({
          user: state.user,
          workspaces: state.workspaces,
          activeWorkspaceId: state.activeWorkspaceId,
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
          workspaces: state.workspaces,
          activeWorkspaceId: state.activeWorkspaceId,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        });
      }
    },
    hydrateWorkspaces(state, action) {
      state.workspaces = Array.isArray(action.payload.workspaces)
        ? action.payload.workspaces
        : [];
      state.activeWorkspaceId = action.payload.activeWorkspaceId ?? null;
      if (state.accessToken) {
        persistAuth({
          user: state.user,
          workspaces: state.workspaces,
          activeWorkspaceId: state.activeWorkspaceId,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
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
      state.workspaces = [];
      state.activeWorkspaceId = null;
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
      state.workspaces = [];
      state.activeWorkspaceId = null;
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
  hydrateWorkspaces,
  setRequiresOtp,
  setOtpState,
  clearOtpState,
  clearAuth,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
