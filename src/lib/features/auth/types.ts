export interface RegisterRequest {
  email?: string;
  phone?: string;
  password?: string;
  accessToken?: string;
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
}

export interface VerifyOtpRequest {
  identifier: string;
  code: string;
  purpose:
    | "EMAIL_VERIFICATION"
    | "PHONE_VERIFICATION"
    | "PASSWORD_RESET"
    | "LOGIN_2FA"
    | "LOGIN_PASSWORDLESS"
    | "ACCOUNT_DELETION";
}

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
  email: string;
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

export interface AuthSuccessResponse {
  statusCode: number;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: true;
}

export interface OtpSentResponse {
  statusCode: number;
  data: null;
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
  statusCode: number;
  message: string;
  success: false;
  code?: string;
}
