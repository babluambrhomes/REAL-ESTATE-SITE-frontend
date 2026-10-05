import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { authApi } from "./authApi";
import { setAuth, setRequiresOtp, setOtpState, setVerificationToken, clearAuth } from "@/store/slice/authSlice";
import { useAppDispatch } from "@/store/hooks";
import type { AuthSuccessResponse, OtpSentResponse, ApiError } from "@/types";
import type {
  RegisterRequest,
  LoginRequest,
  VerifyOtpRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/types";
import toast from "react-hot-toast";

function getErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<ApiError>;
  return axiosError.response?.data?.message || fallback;
}

function isOtpSentResponse(
  response: AuthSuccessResponse | OtpSentResponse
): response is OtpSentResponse {
  return (
    response.message?.toLowerCase().includes("otp") ||
    response.message?.toLowerCase().includes("verify")
  );
}

export function useLoginMutation() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (result, variables) => {
      if (isOtpSentResponse(result)) {
        const identifier = variables.email || variables.phone || "";

        if ("verificationToken" in result.data && result.data.verificationToken) {
          dispatch(setVerificationToken(result.data.verificationToken));
        }

        dispatch(
          setOtpState({
            identifier,
            purpose: "PHONE_VERIFICATION",
          })
        );

        dispatch(setRequiresOtp(true));
      } else if (result.data) {
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
      const requiresVerification =
        result.message?.toLowerCase().includes("otp") ?? false;

      if (requiresVerification) {
        const purpose = variables.phone
          ? "PHONE_VERIFICATION"
          : "EMAIL_VERIFICATION";

        const identifier = variables.phone || variables.email || "";

        // Keep tokens received from backend
        if (result.data) {
          dispatch(setAuth(result.data));
        }

        // Then show OTP screen
        dispatch(setOtpState({ identifier, purpose }));
        dispatch(setRequiresOtp(true));
      } else if (result.data) {
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
      }
    },
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
      toast.error(getErrorMessage(error, "Password reset failed"));
    },
  });
}
