

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import { useLoginMutation } from "@/lib/features/auth/authMutations";
import { clearOtpState } from "@/store/slice/authSlice";
import { useAppDispatch, useAppSelector } from'@/store/hooks';
import {
  loginEmailSchema,
  loginPhonePasswordSchema,
  type LoginEmailForm,
  type LoginPhonePasswordForm,
} from "@/lib/features/auth/schemas";
import toast from "react-hot-toast";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { GoogleAuth } from "@/components/auth/GoogleAuth";
import { WhatsAppButton } from "@/components/auth/WhatsAppButton";
import { VerifyOtpForm } from "@/components/auth/VerifyOtpForm";
import { ChangePasswordSuccess } from "@/components/auth/ChangePasswordSuccess";
import type { LoginMode } from "@/types";


const COUNTRY_CODES = ["+91", "+1", "+44", "+971", "+65", "+61", "+49", "+33"];

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loginMutation = useLoginMutation();

  const requiresOtp = useAppSelector((s) => s.auth.requiresOtp);
  const otpIdentifier = useAppSelector((s) => s.auth.otpIdentifier);
  const otpPurpose = useAppSelector((s) => s.auth.otpPurpose);

  const [mode, setMode] = useState<LoginMode>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const emailForm = useForm<LoginEmailForm>({
    resolver: zodResolver(loginEmailSchema),
  });

  const phoneForm = useForm<LoginPhonePasswordForm>({
    resolver: zodResolver(loginPhonePasswordSchema),
  });

  const onEmailLogin = (data: LoginEmailForm) => {
    loginMutation.mutate(data, {
      onSuccess: (result) => {
        if (result.data === null) {
          toast.success("OTP sent! Verify to continue.");
         
        } else {
          toast.success("Logged in successfully");
          router.push("/");
        }
      },
    });
  };

  const onPhoneLogin = (data: LoginPhonePasswordForm) => {
    loginMutation.mutate(
      { phone: `${countryCode}${data.phone}`, password: data.password },
      {
        onSuccess: (result) => {
          if (result.data === null) {
            toast.success("OTP sent! Verify to continue.");
          } else {
            toast.success("Logged in successfully");
            router.push("/");
          }
        },
      }
    );
  };

 
  const inputBase =
    "h-10 w-full rounded-lg border mt-1 border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  if (requiresOtp && otpIdentifier && otpPurpose) {
    return (
      <VerifyOtpForm
        identifier={otpIdentifier}
        purpose={otpPurpose}
        apiUrl="/verify-otp"
        imgUrl="/auth/otp.png"
        onSuccess={() => {
          dispatch(clearOtpState());
          router.push("/");
        }}
      />
    );
  }


  // return <ChangePasswordSuccess />

  return (
    <div className="relative flex w-full flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:items-center">
      <div className="hidden w-full max-w-md lg:block">
        <Image
          src="/auth/register.png"
          alt="Roofin login"
          width={600}
          height={600}
          className="h-auto w-full object-contain"
        />
      </div>
      <div>
        <div className="w-full max-w-md rounded-2xl border border-dashed border-black bg-white p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 [font-family:var(--font-playfair)]">
              Welcome back to Roofin
            </h1>
            <p className="mt-1.5 text-[12px] text-black">
              India&apos;s trusted property platform for buyers, sellers, builders, and agents.
            </p>
          </div>

         <WhatsAppButton />

          {mode === "email" && (
            <form
              onSubmit={emailForm.handleSubmit(onEmailLogin)}
              className="mt-6 space-y-2"
            >
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputBase}
                  {...emailForm.register("email")}
                />
                {emailForm.formState.errors.email?.message && (
                  <p className="text-sm text-red-600">
                    {emailForm.formState.errors.email?.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                 <div className="flex justify-between items-end ">
                  <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <span className="text-[10px] text-primary">8+ chars, Aa, 1, & @</span>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    autoComplete="current-password"
                    className={`${inputBase} pr-10`}
                    {...emailForm.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {emailForm.formState.errors.password?.message && (
                  <p className="text-sm text-red-600">
                    {emailForm.formState.errors.password?.message}
                  </p>
                )}
                 <Link
                    href="/forgot-password"
                    className="text-[10px] text-primary hover:text-primary/80"
                  >
                    Forgot Password?
                  </Link>
              </div>

              <PrimaryButton
                pending={loginMutation.isPending}
                pendingLabel="Signing in..."
              >
                Sign in
              </PrimaryButton>
            </form>
          )}

          {mode === "phone" && (
            <form
              onSubmit={phoneForm.handleSubmit(onPhoneLogin)}
              className="mt-6 space-y-2"
            >
              <div className="space-y-1">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <div className="flex rounded-md border border-gray-300 bg-white shadow-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary">
                  <select
                    aria-label="Country code"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="h-10 w-16 shrink-0 rounded-l-md border-r border-gray-300 px-2 text-sm text-gray-700 focus:outline-none"
                  >
                    {COUNTRY_CODES.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    autoComplete="tel"
                    className="h-10 w-full bg-transparent px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    {...phoneForm.register("phone")}
                  />
                </div>
                {phoneForm.formState.errors.phone?.message && (
                  <p className="text-sm text-red-600">
                    {phoneForm.formState.errors.phone?.message}
                  </p>
                )}
              </div>

            
              <PrimaryButton
                pending={loginMutation.isPending}
                pendingLabel="Signing in..."
              >
                Sign in
              </PrimaryButton>
            </form>
          )}

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs uppercase font-medium text-gray-500">
              or continue with
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <GoogleAuth  AuthType='LOGIN'/>

          <button
            type="button"
            onClick={() => setMode(mode === "phone" ? "email" : "phone")}
            className="mt-3 relative inline-flex w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-[12px] font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {mode === "phone" ? (
              <>
                <span className="relative">
                  <Mail className="h-4 w-4" />
                  <span className="absolute -right-1 top-1 -translate-x-1/2 -translate-y-1/2 bg-white h-1.5 w-1.5 rounded-4xl" />
                </span>
                With Email
              </>
            ) : (
              <>
                <span className="relative">
                  <Phone className="h-4 w-4" />
                  <span className="absolute -right-1 top-1 -translate-x-1/2 -translate-y-1/2 bg-white h-1.5 w-1.5 rounded-4xl" />
                </span>
                With Phone
              </>
            )}
          </button>

         
        </div>

        <p className="mt-6 text-center text-base text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

