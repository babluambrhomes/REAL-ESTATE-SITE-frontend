"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import OtpInput from "react-otp-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtpSchema, type VerifyOtpForm as VerifyOtpFormType } from "@/lib/features/auth/schemas";
import type { VerifyOtpRequest } from "@/lib/features/auth/types";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { PrimaryButton } from "@/components/button/PrimaryButton";

const DEFAULT_RESEND_DELAY = 30;

type VerifyOtpFormProps = {
  identifier: string;
  purpose: string;
  apiUrl: string;
  onSuccess?: () => void;
  onResend?: () => Promise<void> | void;
  resendDelay?: number;
  imgUrl:string
};

function getPurposeLabel(purpose: string): string {
  switch (purpose) {
    case "EMAIL_VERIFICATION":
      return "email";
    case "PHONE_VERIFICATION":
      return "phone";
    case "PASSWORD_RESET":
      return "password reset";
    case "LOGIN_PASSWORDLESS":
      return "phone";
    default:
      return "account";
  }
}

function getErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as { response?: { data?: { message?: string } } };
  return axiosError.response?.data?.message || fallback;
}

export function VerifyOtpForm({
  identifier,
  purpose,
  apiUrl,
  onSuccess,
  onResend,
  resendDelay = DEFAULT_RESEND_DELAY,
  imgUrl='/auth/otp.png'
}: VerifyOtpFormProps) {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(resendDelay);
  const [isPending, setIsPending] = useState(false);

  const purposeLabel = getPurposeLabel(purpose);

  const form = useForm<VerifyOtpFormType>({
    resolver: zodResolver(verifyOtpSchema),
  });

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleOtpChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 6);
    setOtp(digits);
    form.setValue("code", digits);
  };

  const handleResend = async () => {
    try {
      if (onResend) await onResend();
      setSeconds(resendDelay);
      setOtp("");
      form.setValue("code", "");
      toast.success("OTP resent. Check your " + purposeLabel);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to resend OTP"));
    }
  };

  const onSubmit = async (data: VerifyOtpFormType) => {
    setIsPending(true);
    try {
      await axiosInstance.post(apiUrl, {
        identifier,
        code: data.code,
        purpose: purpose as VerifyOtpRequest["purpose"],
      });
      toast.success("Verified successfully");
      onSuccess?.();
    } catch (error) {
      toast.error(getErrorMessage(error, "OTP verification failed"));
    } finally {
      setIsPending(false);
    }
  };

  const formattedTime = `00:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="relative flex w-full flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:items-center">
      <div className="hidden w-full max-w-md lg:block">
        <Image
          src={imgUrl}
          alt="Roofin verify OTP"
          width={600}
          height={600}
          className="h-auto w-full object-contain"
        />
      </div>
      <div>
        <div className="w-full max-w-md rounded-2xl border border-dashed border-black bg-white p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 [font-family:var(--font-playfair)]">
              Check your {purposeLabel}
            </h1>
            <p className="text-center text-[12px] text-black">
              We Sent 6 Digit code on{" "}
              <span className="text-primary hover:text-primary/80">
                {purposeLabel}
              </span>
            </p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-1">
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={6}
                shouldAutoFocus
                inputType="tel"
                skipDefaultStyles
                renderInput={(inputProps) => (
                  <input {...inputProps} className="otp-input" />
                )}
                containerStyle={{
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              />
              {form.formState.errors.code?.message && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.code?.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              {seconds > 0 ? (
                <span className="text-sm text-gray-500">
                  Resend OTP in <span className="font-medium text-primary">{formattedTime}</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <PrimaryButton pending={isPending} className='capitalize' pendingLabel="Verifying...">
              Verify {purposeLabel}
            </PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
}
