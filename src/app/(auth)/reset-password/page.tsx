"use client";

import { useState } from "react";

import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "@/lib/features/auth/authMutations";
import {
  resetPasswordSchema,
  type ResetPasswordForm as ResetPasswordFormType,
} from "@/lib/features/auth/schemas";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {
  
 
  const resetMutation = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormType) => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }
    resetMutation.mutate(
      { token, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast.success("Password updated successfully");
          router.push("/login");
        },
      }
    );
  };


  const inputBase =
    "h-10 w-full rounded-lg border mt-1 border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <div className="relative flex w-full flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:items-center">
      <div className="hidden w-full max-w-md lg:block">
        <Image
          src="/auth/register.png"
          alt="Roofin reset password"
          width={600}
          height={600}
          className="h-auto w-full object-contain"
        />
      </div>
      <div>
        <div className="w-full max-w-md rounded-2xl border border-dashed border-black bg-white p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 [font-family:var(--font-playfair)]">
              Set new password
            </h1>
            <p className="mt-1.5 text-[12px] text-black">
              Create a new password. Ensure it differs from
              previous ones for security
            </p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-1">
              <div className="flex justify-between items-end ">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-gray-900"
                >
                  New password
                </label>
                <span className="text-[10px] text-primary">8+ chars, Aa, 1, & @</span>
              </div>

              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className={`${inputBase} pr-10`}
                  {...form.register("newPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {form.formState.errors.newPassword?.message && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.newPassword?.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-900"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  className={`${inputBase} pr-10`}
                  {...form.register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {form.formState.errors.confirmPassword?.message && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.confirmPassword?.message}
                </p>
              )}
            </div>

            <PrimaryButton
              pending={resetMutation.isPending}
              pendingLabel="Resetting..."
            >
              Update password
            </PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
}
