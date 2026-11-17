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
} from "@/types";

export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthSuccessResponse | OtpSentResponse> => {
    if (typeof window !== "undefined") {
      localStorage.setItem("roofin_registered_user", JSON.stringify(data));
    }
    return {
      statusCode: 200,
      success: true,
      message: "Account created! Verify your phone with OTP.",
      data: {
        user: {
          id: "mock-user-1",
          phone: data.phone,
          email: data.email || "sandhya@roofin.in",
          person: {
            firstName: data.firstName || "Sandhya",
            lastName: "",
          },
          role: "BUYER",
        },
        accessToken: "mock-access-token-123",
        refreshToken: "mock-refresh-token-123",
      },
    } as any;
  },

  login: async (_data: LoginRequest): Promise<AuthSuccessResponse | OtpSentResponse> => {
    return {
      statusCode: 200,
      success: true,
      message: "OTP sent! Verify to continue.",
      data: {
        verificationToken: "mock-verification-token",
      },
    } as any;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<AuthSuccessResponse | MessageResponse> => {
    let savedFirstName = "Sandhya";
    if (typeof window !== "undefined") {
      try {
        const u = JSON.parse(localStorage.getItem("roofin_registered_user") || "{}");
        if (u.firstName) savedFirstName = u.firstName;
      } catch {}
    }
    return {
      statusCode: 200,
      success: true,
      message: "Verified successfully",
      data: {
        user: {
          id: "mock-user-1",
          phone: data.identifier || "+91 9870000002",
          email: "sandhya@roofin.in",
          person: {
            firstName: savedFirstName,
            lastName: "",
          },
          role: "BUYER",
        },
        accessToken: "mock-access-token-123",
        refreshToken: "mock-refresh-token-123",
      },
    } as any;
  },

  refresh: async (_data: RefreshRequest): Promise<RefreshResponse> => {
    return {
      statusCode: 200,
      success: true,
      message: "Token refreshed",
      data: {
        accessToken: "mock-access-token-123",
      },
    } as any;
  },

  forgotPassword: async (_data: ForgotPasswordRequest): Promise<MessageResponse> => {
    return {
      statusCode: 200,
      data: null,
      success: true,
      message: "Password reset link sent successfully.",
    };
  },

  resetPassword: async (_data: ResetPasswordRequest): Promise<MessageResponse> => {
    return {
      statusCode: 200,
      data: null,
      success: true,
      message: "Password reset successful.",
    };
  },

  updateContact: async (data: UpdateContactRequest): Promise<MessageResponse> => {
    if (typeof window !== "undefined" && data.email) {
      try {
        const u = JSON.parse(localStorage.getItem("roofin_user_profile") || "{}");
        u.email = data.email;
        localStorage.setItem("roofin_user_profile", JSON.stringify(u));
      } catch {}
    }
    return {
      statusCode: 200,
      data: null,
      success: true,
      message: "Contact updated successfully",
    };
  },

  updatePassword: async (_data: UpdatePasswordRequest): Promise<MessageResponse> => {
    return {
      statusCode: 200,
      data: null,
      success: true,
      message: "Password updated successfully",
    };
  },

  logout: async (): Promise<MessageResponse> => {
    return {
      statusCode: 200,
      data: null,
      success: true,
      message: "Logged out successfully",
    };
  },
};
