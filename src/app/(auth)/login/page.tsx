"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Phone, Smartphone, Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setOtpState, setRequiresOtp, clearOtpState } from "@/lib/features/auth/authSlice";
import { useLoginMutation } from "@/lib/features/auth/authMutations";
import {
  loginEmailSchema,
  loginPhoneSchema,
  loginPhoneVerifySchema,
  type LoginEmailForm,
  type LoginPhoneForm,
  type LoginPhoneVerifyForm,
} from "@/lib/features/auth/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/seprator";
import toast from "react-hot-toast";

type LoginMode = "email" | "phone-start" | "phone-verify" | "google";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { otpIdentifier } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const [mode, setMode] = useState<LoginMode>("email");
  const [showPassword, setShowPassword] = useState(false);

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
          dispatch(setOtpState({ identifier: data.email, purpose: "LOGIN_PASSWORDLESS" }));
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
        dispatch(setOtpState({ identifier: data.phone, purpose: "LOGIN_PASSWORDLESS" }));
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
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600 mb-2 block">
          AmbrHomes
        </Link>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        {mode === "email" && (
          <form onSubmit={emailForm.handleSubmit(onEmailLogin)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  autoComplete="email"
                  {...emailForm.register("email")}
                />
              </div>
              {emailForm.formState.errors.email && (
                <p className="text-sm text-red-600">
                  {emailForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  autoComplete="current-password"
                  {...emailForm.register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {emailForm.formState.errors.password && (
                <p className="text-sm text-red-600">
                  {emailForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        )}

        {mode === "phone-start" && (
          <form onSubmit={phoneForm.handleSubmit(onPhoneStart)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+919876543210"
                  className="pl-10"
                  {...phoneForm.register("phone")}
                />
              </div>
              {phoneForm.formState.errors.phone && (
                <p className="text-sm text-red-600">
                  {phoneForm.formState.errors.phone.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        )}

        {mode === "phone-verify" && (
          <form onSubmit={phoneVerifyForm.handleSubmit(onPhoneVerify)} className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Enter the OTP sent to {otpIdentifier}
            </p>
            <div className="space-y-2">
              <Label htmlFor="code">OTP Code</Label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  placeholder="482916"
                  className="pl-10 text-center text-lg tracking-widest"
                  maxLength={6}
                  {...phoneVerifyForm.register("code")}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
                    phoneVerifyForm.setValue("code", digits);
                  }}
                />
              </div>
              {phoneVerifyForm.formState.errors.code && (
                <p className="text-sm text-red-600">
                  {phoneVerifyForm.formState.errors.code.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Verifying..." : "Verify & Sign in"}
            </Button>
            <button
              type="button"
              onClick={() => {
                setMode("phone-start");
                dispatch(clearOtpState());
              }}
              className="w-full text-sm text-indigo-600 hover:text-indigo-500"
            >
              Change phone number
            </button>
          </form>
        )}

        {mode === "google" && (
          <div className="text-center py-4">
            <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        )}

        <div className="mt-6">
          <Separator className="mb-4" />
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            {mode !== "email" && (
              <button
                type="button"
                onClick={() => setMode("email")}
                className="text-indigo-600 hover:text-indigo-500"
              >
                <Mail className="inline h-3.5 w-3.5 mr-1" />
                Email & password
              </button>
            )}
            {mode !== "phone-start" && mode !== "phone-verify" && (
              <button
                type="button"
                onClick={() => {
                  setMode("phone-start");
                }}
                className="text-indigo-600 hover:text-indigo-500"
              >
                <Phone className="inline h-3.5 w-3.5 mr-1" />
                Phone OTP
              </button>
            )}
            {mode !== "google" && (
              <button
                type="button"
                onClick={() => setMode("google")}
                className="text-indigo-600 hover:text-indigo-500"
              >
                <svg className="inline h-3.5 w-3.5 mr-1" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google SSO
              </button>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
