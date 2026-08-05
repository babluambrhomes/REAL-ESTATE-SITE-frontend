"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Lock, AlertCircle } from "lucide-react";
import { useResetPasswordMutation } from "@/lib/features/auth/authMutations";
import {
  resetPasswordSchema,
  type ResetPasswordForm as ResetPasswordFormType,
} from "@/lib/features/auth/schemas";
import { FormCard } from "@/components/auth/FormCard";
import { MessageCard } from "@/components/auth/MessageCard";
import { FormField } from "@/components/auth/FormField";
import { PrimaryButton } from "@/components/button/PrimaryButton";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const resetMutation = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormType) => {
    if (!token) return;
    resetMutation.mutate(
      { token, newPassword: data.newPassword },
      {
        onSuccess: () => {
          router.push("/login");
        },
      }
    );
  };

  const backToLogin = (
    <Link
      href="/login"
      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to login
    </Link>
  );

  if (!token) {
    return (
      <MessageCard
        icon={<AlertCircle className="h-6 w-6" />}
        title="Invalid link"
        description="This password reset link is invalid or has expired."
      >
        <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            Request a new reset link
          </Link>
        </div>
      </MessageCard>
    );
  }

  return (
    <FormCard
      title="Set new password"
      description="Enter your new password below"
      footer={backToLogin}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          id="newPassword"
          type="password"
          label="New password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
          leadingIcon={<Lock className="h-4 w-4" />}
          error={form.formState.errors.newPassword?.message}
          {...form.register("newPassword")}
        />
        <FormField
          id="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="Repeat your password"
          autoComplete="new-password"
          leadingIcon={<Lock className="h-4 w-4" />}
          error={form.formState.errors.confirmPassword?.message}
          {...form.register("confirmPassword")}
        />
        <PrimaryButton
          pending={resetMutation.isPending}
          pendingLabel="Resetting..."
        >
          Reset password
        </PrimaryButton>
      </form>
    </FormCard>
  );
}
