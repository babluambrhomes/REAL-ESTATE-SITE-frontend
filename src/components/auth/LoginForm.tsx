"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Phone, Smartphone } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setOtpState,
  setRequiresOtp,
  clearOtpState,
} from "@/lib/features/auth/authSlice";
import { useLoginMutation } from "@/lib/features/auth/authMutations";
import {
  loginEmailSchema,
  loginPhoneSchema,
  loginPhoneVerifySchema,
  type LoginEmailForm,
  type LoginPhoneForm,
  type LoginPhoneVerifyForm,
} from "@/lib/features/auth/schemas";
import toast from "react-hot-toast";
import { FormCard } from "@/components/auth/FormCard";
import { FormField } from "@/components/auth/FormField";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { GoogleButton } from "@/components/button/GoogleButton";
import { TextButton } from "@/components/auth/TextButton";
import { GoogleIcon } from "@/components/auth/GoogleIcon";

type LoginMode = "email" | "phone-start" | "phone-verify" | "google";

export function LoginForm() {
  const dispatch = useAppDispatch();
  const { otpIdentifier } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const [mode, setMode] = useState<LoginMode>("email");

  const emailForm = useForm<LoginEmailForm>({
    resolver: zodResolver(loginEmailSchema),
  });

  const phoneForm = useForm<LoginPhoneForm>({
    resolver: zodResolver(loginPhoneSchema),
  });

  const phoneVerifyForm = useForm<LoginPhoneVerifyForm>({
    resolver: zodResolver(loginPhoneVerifySchema),
  });

  const onEmailLogin = (data: LoginEmailForm) => {
    loginMutation.mutate(data, {
      onSuccess: (result) => {
        if (result.data === null) {
          dispatch(
            setOtpState({ identifier: data.email, purpose: "LOGIN_PASSWORDLESS" })
          );
          dispatch(setRequiresOtp(true));
          setMode("phone-verify");
          phoneVerifyForm.setValue("code", "");
        } else {
          toast.success("Logged in successfully");
          router.push("/");
        }
      },
    });
  };

  const onPhoneStart = (data: LoginPhoneForm) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        dispatch(
          setOtpState({ identifier: data.phone, purpose: "LOGIN_PASSWORDLESS" })
        );
        dispatch(setRequiresOtp(true));
        setMode("phone-verify");
        phoneVerifyForm.setValue("code", "");
      },
    });
  };

  const onPhoneVerify = (data: LoginPhoneVerifyForm) => {
    const phone = otpIdentifier || phoneForm.getValues("phone");
    loginMutation.mutate(
      { phone, code: data.code },
      {
        onSuccess: (result) => {
          if (result.data !== null) {
            toast.success("Logged in successfully");
            router.push("/");
          }
        },
      }
    );
  };

  const handleGoogleLogin = () => {
    toast("Google login coming soon");
  };

  return (
    <FormCard
      title="Welcome back"
      description="Sign in to your account"
      footer={
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign up
          </Link>
        </p>
      }
    >
      {mode === "email" && (
        <form
          onSubmit={emailForm.handleSubmit(onEmailLogin)}
          className="space-y-4"
        >
          <FormField
            id="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            autoComplete="email"
            leadingIcon={<Mail className="h-4 w-4" />}
            error={emailForm.formState.errors.email?.message}
            {...emailForm.register("email")}
          />
          <FormField
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
            leadingIcon={<Lock className="h-4 w-4" />}
            labelEnd={
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary/80"
              >
                Forgot?
              </Link>
            }
            error={emailForm.formState.errors.password?.message}
            {...emailForm.register("password")}
          />
          <PrimaryButton
            pending={loginMutation.isPending}
            pendingLabel="Signing in..."
          >
            Sign in
          </PrimaryButton>
        </form>
      )}

      {mode === "phone-start" && (
        <form
          onSubmit={phoneForm.handleSubmit(onPhoneStart)}
          className="space-y-4"
        >
          <FormField
            id="phone"
            type="tel"
            label="Phone Number"
            placeholder="+919876543210"
            leadingIcon={<Phone className="h-4 w-4" />}
            error={phoneForm.formState.errors.phone?.message}
            {...phoneForm.register("phone")}
          />
          <PrimaryButton
            pending={loginMutation.isPending}
            pendingLabel="Sending OTP..."
          >
            Send OTP
          </PrimaryButton>
        </form>
      )}

      {mode === "phone-verify" && (
        <form
          onSubmit={phoneVerifyForm.handleSubmit(onPhoneVerify)}
          className="space-y-4"
        >
          <p className="text-center text-sm text-gray-600">
            Enter the OTP sent to {otpIdentifier}
          </p>
          <FormField
            id="code"
            type="text"
            inputMode="numeric"
            label="OTP Code"
            placeholder="482916"
            leadingIcon={<Smartphone className="h-4 w-4" />}
            maxLength={6}
            className="text-center text-lg tracking-widest"
            error={phoneVerifyForm.formState.errors.code?.message}
            {...phoneVerifyForm.register("code")}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
              phoneVerifyForm.setValue("code", digits);
            }}
          />
          <PrimaryButton
            pending={loginMutation.isPending}
            pendingLabel="Verifying..."
          >
            Verify &amp; Sign in
          </PrimaryButton>
          <TextButton
            onClick={() => {
              setMode("phone-start");
              dispatch(clearOtpState());
            }}
            className="w-full"
          >
            Change phone number
          </TextButton>
        </form>
      )}

      {mode === "google" && (
        <div className="py-4 text-center">
          <GoogleButton onClick={handleGoogleLogin}>
            Continue with Google
          </GoogleButton>
        </div>
      )}

      <div className="mt-6">
        <div className="mb-4 h-px w-full bg-gray-200" />
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {mode !== "email" && (
            <TextButton onClick={() => setMode("email")}>
              <Mail className="mr-1 inline h-3.5 w-3.5" />
              Email &amp; password
            </TextButton>
          )}
          {mode !== "phone-start" && mode !== "phone-verify" && (
            <TextButton onClick={() => setMode("phone-start")}>
              <Phone className="mr-1 inline h-3.5 w-3.5" />
              Phone OTP
            </TextButton>
          )}
          {mode !== "google" && (
            <TextButton onClick={() => setMode("google")}>
              <GoogleIcon className="mr-1 inline h-3.5 w-3.5" />
              Google SSO
            </TextButton>
          )}
        </div>
      </div>
    </FormCard>
  );
}
