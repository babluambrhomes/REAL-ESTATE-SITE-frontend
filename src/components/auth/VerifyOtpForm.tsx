"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Smartphone } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import { useVerifyOtpMutation } from "@/lib/features/auth/authMutations";
import {
  verifyOtpSchema,
  type VerifyOtpForm as VerifyOtpFormType,
} from "@/lib/features/auth/schemas";
import type { VerifyOtpRequest } from "@/lib/features/auth/types";
import toast from "react-hot-toast";
import { FormCard } from "@/components/auth/FormCard";
import { FormField } from "@/components/auth/FormField";
import { PrimaryButton } from "@/components/button/PrimaryButton";

export function VerifyOtpForm() {
  const { otpIdentifier, otpPurpose } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const verifyMutation = useVerifyOtpMutation();

  const purposeLabel =
    otpPurpose === "EMAIL_VERIFICATION"
      ? "email"
      : otpPurpose === "PHONE_VERIFICATION"
        ? "phone"
        : "account";

  const form = useForm<VerifyOtpFormType>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const onSubmit = (data: VerifyOtpFormType) => {
    const identifier = otpIdentifier;
    const purpose = otpPurpose as VerifyOtpRequest["purpose"];

    if (!identifier || !purpose) {
      toast.error("No verification pending. Please register or login first.");
      router.push("/register");
      return;
    }

    verifyMutation.mutate(
      { identifier, code: data.code, purpose },
      {
        onSuccess: () => {
          toast.success("Verified successfully");
          router.push("/");
        },
      }
    );
  };

  return (
    <FormCard
      title={`Verify your ${purposeLabel}`}
      description={`Enter the 6-digit code sent to ${otpIdentifier || "your account"}`}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          id="code"
          type="text"
          inputMode="numeric"
          label="OTP Code"
          placeholder="482916"
          leadingIcon={<Smartphone className="h-4 w-4" />}
          maxLength={6}
          autoFocus
          className="text-center text-2xl tracking-[0.5em]"
          error={form.formState.errors.code?.message}
          {...form.register("code")}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
            form.setValue("code", digits);
          }}
        />
        <PrimaryButton pending={verifyMutation.isPending} pendingLabel="Verifying...">
          Verify
        </PrimaryButton>
        <p className="text-center text-sm text-gray-500">
          Didn&apos;t receive the code? Check your {purposeLabel} or{" "}
          <Link href="/register" className="text-primary hover:text-primary/80">
            try again
          </Link>
        </p>
      </form>
    </FormCard>
  );
}
