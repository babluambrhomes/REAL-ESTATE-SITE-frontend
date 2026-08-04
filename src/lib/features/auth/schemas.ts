import { z } from "zod";

export const loginEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginPhoneSchema = z.object({
  phone: z.string().min(10, "Enter a valid phone number"),
});

export const loginPhoneVerifySchema = z.object({
  code: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export const registerEmailSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerPhoneSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  phone: z.string().min(10, "Enter a valid phone number"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyOtpSchema = z.object({
  code: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export type LoginEmailForm = z.infer<typeof loginEmailSchema>;
export type LoginPhoneForm = z.infer<typeof loginPhoneSchema>;
export type LoginPhoneVerifyForm = z.infer<typeof loginPhoneVerifySchema>;
export type RegisterEmailForm = z.infer<typeof registerEmailSchema>;
export type RegisterPhoneForm = z.infer<typeof registerPhoneSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
export type VerifyOtpForm = z.infer<typeof verifyOtpSchema>;
