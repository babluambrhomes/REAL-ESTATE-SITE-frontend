import type { User } from "./auth";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  requiresOtp: boolean;
  otpIdentifier: string | null;
  otpPurpose: string | null;
}
