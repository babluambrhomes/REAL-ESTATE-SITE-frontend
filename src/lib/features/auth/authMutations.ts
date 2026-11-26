import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { authApi } from "./authApi";
import {
  setAuth,
  setRequiresOtp,
  setOtpState,
  setVerificationToken,
  clearOtpState,
} from "@/store/slice/authSlice";
import { useAppDispatch } from "@/store/hooks";
import type {
  AuthResponse,
  ApiError,
  RegisterRequest,
  LoginRequest,
  VerifyOtpRequest,
  PublicVerifyOtpRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/types";
import toast from "react-hot-toast";

function getErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<ApiError>;
  return axiosError.response?.data?.message || fallback;
}

function getVerificationToken(response: AuthResponse): string | null {
  const data = response.data;
  return "verificationToken" in data && data.verificationToken
    ? data.verificationToken
    : null;
}

export function useLoginMutation() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (result, variables) => {
      const verificationToken = getVerificationToken(result);

      if (verificationToken) {
        dispatch(setVerificationToken(verificationToken));
        dispatch(
          setOtpState({
            identifier: variables.phone || variables.email || "",
            purpose: variables.phone ? "PHONE_VERIFICATION" : "EMAIL_VERIFICATION",
          })
        );
        dispatch(setRequiresOtp(true));
      } else if ("accessToken" in result.data && result.data.accessToken) {
        dispatch(setAuth(result.data));
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Login failed"));
    },
  });
}

export function useRegisterMutation() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (result, variables) => {
      const isGoogleAuth = !!variables.FbTokenId || !!variables.accessToken;
      const verificationToken = getVerificationToken(result);

      if (!isGoogleAuth && verificationToken) {
        dispatch(setVerificationToken(verificationToken));
        dispatch(
          setOtpState({
            identifier: variables.phone || variables.email || "",
            purpose: variables.phone ? "PHONE_VERIFICATION" : "EMAIL_VERIFICATION",
          })
        );
        dispatch(setRequiresOtp(true));
      } else if ("accessToken" in result.data && result.data.accessToken) {
        dispatch(setAuth(result.data));
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Registration failed"));
    },
  });
}

export function useVerifyOtpMutation() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => authApi.verifyOtp(data),
    onSuccess: (result) => {
      if (result.data) {
        dispatch(setAuth(result.data));
        dispatch(clearOtpState());
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "OTP verification failed"));
    },
  });
}

export function useVerifyPublicOtpMutation() {
  return useMutation({
    mutationFn: (data: PublicVerifyOtpRequest) => authApi.verifyPublicOtp(data),
    onError: (error) => {
      toast.error(getErrorMessage(error, "OTP verification failed"));
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to send reset link"));
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to reset password"));
    },
  });
}
