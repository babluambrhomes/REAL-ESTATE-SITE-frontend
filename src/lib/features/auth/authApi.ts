import { axiosInstance } from "@/lib/axios";
import type {
  RegisterRequest,
  LoginRequest,
  VerifyOtpRequest,
  RefreshRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdateContactRequest,
  UpdatePasswordRequest,
  AuthSuccessResponse,
  OtpSentResponse,
  MessageResponse,
  RefreshResponse,
} from "./types";

export const authApi = {
  register: (data: RegisterRequest) =>
    axiosInstance.post<AuthSuccessResponse>("/register", data).then((r) => r.data),

  login: (data: LoginRequest) =>
    axiosInstance.post<AuthSuccessResponse | OtpSentResponse>("/login", data).then((r) => r.data),

  verifyOtp: (data: VerifyOtpRequest) =>
    axiosInstance.post<MessageResponse>("/verify-otp", data).then((r) => r.data),

  refresh: (data: RefreshRequest) =>
    axiosInstance.post<RefreshResponse>("/refresh", data).then((r) => r.data),

  forgotPassword: (data: ForgotPasswordRequest) =>
    axiosInstance.post<MessageResponse>("/forgot-password", data).then((r) => r.data),

  resetPassword: (data: ResetPasswordRequest) =>
    axiosInstance.post<MessageResponse>("/reset-password", data).then((r) => r.data),

  updateContact: (data: UpdateContactRequest) =>
    axiosInstance.patch<MessageResponse>("/me/contact", data).then((r) => r.data),

  updatePassword: (data: UpdatePasswordRequest) =>
    axiosInstance.patch<MessageResponse>("/me/password", data).then((r) => r.data),

  logout: () =>
    axiosInstance.post<MessageResponse>("/logout").then((r) => r.data),
};
