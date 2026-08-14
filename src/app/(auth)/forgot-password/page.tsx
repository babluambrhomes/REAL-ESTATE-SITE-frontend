"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "@/lib/features/auth/authMutations";
import {
  forgotPasswordSchema,
  type ForgotPasswordForm as ForgotPasswordFormType,
} from "@/lib/features/auth/schemas";

import { PrimaryButton } from "@/components/button/PrimaryButton";


export default function ForgotPasswordForm() {
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


  const inputBase =
    "h-10 w-full rounded-lg border mt-1 border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <div className="relative flex w-full flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:items-center">
      <div className="hidden w-full max-w-md lg:block">
        <Image
          src="/auth/register.png"
          alt="Roofin forgot password"
          width={600}
          height={600}
          className="h-auto w-full object-contain"
        />
      </div>
      <div>
        <div className="w-full max-w-md rounded-2xl border border-dashed border-black bg-white p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 [font-family:var(--font-playfair)]">
              Forgot Password?
            </h1>
            <p className="mt-1.5 text-[12px] text-black">
              No worries! Enter your registered email or mobile number to reset your password.
            </p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="text" className="text-sm font-medium text-gray-900">
                Email/mobile Number
              </label>
              <input
                id="text"
                type="text"
                placeholder="you@example.com"
                autoComplete="text"
                className={inputBase}
                {...form.register("email")}
              />
              {form.formState.errors.email?.message && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.email?.message}
                </p>
              )}
            </div>
            <PrimaryButton
              pending={forgotMutation.isPending}
              pendingLabel="Sending..."
            >
              Reset Password
            </PrimaryButton>
          </form>
        
        </div>
      </div>
    </div>
  );
}
