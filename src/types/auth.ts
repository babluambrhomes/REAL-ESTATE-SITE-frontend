export interface RegisterRequest {
  email?: string;
  phone?: string;
  password?: string;
  accessToken?: string;
  FbTokenId?: string;
  firstName?: string;
  lastName?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
}

export interface LoginRequest {
  email?: string;
  phone?: string;
  password?: string;
  code?: string;
  accessToken?: string;
  FbTokenId?: string;
}

export interface VerifyOtpRequest {
  code: string;
  purpose:
    | "EMAIL_VERIFICATION"
    | "PHONE_VERIFICATION"
    | "PASSWORD_RESET"
    | "LOGIN_2FA"
    | "LOGIN_PASSWORDLESS"
    | "ACCOUNT_DELETION";
}

export type PublicVerifyOtpRequest = VerifyOtpRequest & { identifier: string };

export interface RefreshRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface UpdateContactRequest {
  email?: string;
  phone?: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface Person {
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  city?: string;
  bio?: string;
}

export interface MembershipRole {
  id: string;
  roleName: string;
  isSystemRole: boolean;
}

export interface Membership {
  id: string;
  scope: "ORGANIZATION" | "PLATFORM";
  contextId: string;
  status: string;
  role: MembershipRole;
}

export interface User {
  id: string;
  email: string | null;
  phone: string | null;
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "DEACTIVATED";
  accountOrigin?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  person?: Person;
  memberships?: Membership[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthSuccessResponse {
  statusCode: number;
  data:AuthData;
  message: string;
  success: true;
}

export type RegisterResponse = AuthSuccessResponse | OtpSentResponse;

export type AuthResponse = AuthSuccessResponse | OtpSentResponse;

/**
 * OTP-first response for phone/email signup and login.
 * Bearer verificationToken is used with /auth/private-otp-verify.
 */
export interface OtpSentResponse {
  statusCode: number;
  data: {
    message?: string;
    requiresOtp?: boolean;
    verificationToken: string;
    status?: "PENDING" | "ACTIVE" | "SUSPENDED" | "DEACTIVATED";
    user?: Partial<User> | null;
  };
  message: string;
  success: true;
}

export interface MessageResponse {
  statusCode: number;
  data: null;
  message: string;
  success: true;
}

export interface RefreshResponse {
  statusCode: number;
  data: AuthTokens;
  message: string;
  success: true;
}

export interface ApiError {
  statusCode?: number;
  message: string;
  success: false;
  data: unknown;
  code?: string;
}

export type LoginMode = "email" | "phone";
export type RegisterMode = "email" | "phone";

export interface GoogleAuthProps {
  AuthType: "LOGIN" | "REGISTER";
}

export interface VerifyOtpFormProps {
  identifier: string;
  purpose: string;
  onSuccess?: () => void;
  onResend?: () => Promise<void> | void;
  resendDelay?: number;
  imgUrl: string;
}
