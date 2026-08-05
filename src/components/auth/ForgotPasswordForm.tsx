"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail, MailCheck } from "lucide-react";
import { useForgotPasswordMutation } from "@/lib/features/auth/authMutations";
import {
  forgotPasswordSchema,
  type ForgotPasswordForm as ForgotPasswordFormType,
} from "@/lib/features/auth/schemas";
import { FormCard } from "@/components/auth/FormCard";
import { MessageCard } from "@/components/auth/MessageCard";
import { FormField } from "@/components/auth/FormField";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { TextButton } from "@/components/auth/TextButton";

export function ForgotPasswordForm() {
  const forgotMutation = useForgotPasswordMutation();
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormType) => {
    forgotMutation.mutate(data, {
      onSuccess: () => {
        setSubmittedEmail(data.email);
        setSubmitted(true);
      },
    });
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

  if (submitted) {
    return (
      <MessageCard
        icon={<MailCheck className="h-6 w-6" />}
        title="Check your email"
        description={`If an account exists with ${submittedEmail}, we've sent a password reset link.`}
      >
        <div className="text-center">
          <p className="mb-4 text-sm text-gray-500">
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <TextButton onClick={() => setSubmitted(false)}>try again</TextButton>
          </p>
          {backToLogin}
        </div>
      </MessageCard>
    );
  }

  return (
    <FormCard
      title="Forgot password?"
      description="Enter your email and we'll send you a reset link"
      footer={backToLogin}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          id="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          leadingIcon={<Mail className="h-4 w-4" />}
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />
        <PrimaryButton
          pending={forgotMutation.isPending}
          pendingLabel="Sending..."
        >
          Send reset link
        </PrimaryButton>
      </form>
    </FormCard>
  );
}
