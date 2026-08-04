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
  type VerifyOtpForm,
} from "@/lib/features/auth/schemas";
import type { VerifyOtpRequest } from "@/lib/features/auth/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import toast from "react-hot-toast";

export default function VerifyOtpPage() {
  const { otpIdentifier, otpPurpose } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const verifyMutation = useVerifyOtpMutation();

  const purposeLabel =
    otpPurpose === "EMAIL_VERIFICATION"
      ? "email"
      : otpPurpose === "PHONE_VERIFICATION"
        ? "phone"
        : "account";

  const form = useForm<VerifyOtpForm>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const onSubmit = (data: VerifyOtpForm) => {
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
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600 mb-2 block">
          AmbrHomes
        </Link>
        <CardTitle>Verify your {purposeLabel}</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to {otpIdentifier || "your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="code">OTP Code</Label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                placeholder="482916"
                className="pl-10 text-center text-2xl tracking-[0.5em]"
                maxLength={6}
                autoFocus
                {...form.register("code")}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
                  form.setValue("code", digits);
                }}
              />
            </div>
            {form.formState.errors.code && (
              <p className="text-sm text-red-600">
                {form.formState.errors.code.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={verifyMutation.isPending}
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify"}
          </Button>
          <p className="text-center text-sm text-gray-500">
            Didn&apos;t receive the code? Check your {purposeLabel} or{" "}
            <Link
              href="/register"
              className="text-indigo-600 hover:text-indigo-500"
            >
              try again
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
