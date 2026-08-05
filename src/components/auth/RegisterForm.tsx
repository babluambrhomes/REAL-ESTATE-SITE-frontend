"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Phone, User } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setOtpState } from "@/lib/features/auth/authSlice";
import { useRegisterMutation } from "@/lib/features/auth/authMutations";
import {
  registerEmailSchema,
  registerPhoneSchema,
  type RegisterEmailForm,
  type RegisterPhoneForm,
} from "@/lib/features/auth/schemas";
import toast from "react-hot-toast";
import { FormCard } from "@/components/auth/FormCard";
import { FormField } from "@/components/auth/FormField";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { GoogleButton } from "@/components/button/GoogleButton";
import { TextButton } from "@/components/auth/TextButton";
import { GoogleIcon } from "@/components/auth/GoogleIcon";

type RegisterMode = "email" | "phone" | "google";

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const registerMutation = useRegisterMutation();

  const [mode, setMode] = useState<RegisterMode>("email");

  const emailForm = useForm<RegisterEmailForm>({
    resolver: zodResolver(registerEmailSchema),
  });

  const phoneForm = useForm<RegisterPhoneForm>({
    resolver: zodResolver(registerPhoneSchema),
  });

  const onEmailRegister = (data: RegisterEmailForm) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        dispatch(
          setOtpState({ identifier: data.email, purpose: "EMAIL_VERIFICATION" })
        );
        toast.success("Account created! Verify your email.");
        router.push("/verify-otp");
      },
    });
  };

  const onPhoneRegister = (data: RegisterPhoneForm) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        dispatch(
          setOtpState({ identifier: data.phone, purpose: "PHONE_VERIFICATION" })
        );
        toast.success("Account created! Verify your phone.");
        router.push("/verify-otp");
      },
    });
  };

  const handleGoogleRegister = () => {
    toast("Google registration coming soon");
  };

  return (
    <FormCard
      title="Create an account"
      description="Join AmbrHomes today"
      footer={
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      }
    >
      {mode === "email" && (
        <form
          onSubmit={emailForm.handleSubmit(onEmailRegister)}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="firstName"
              label="First name"
              placeholder="Rahul"
              leadingIcon={<User className="h-4 w-4" />}
              error={emailForm.formState.errors.firstName?.message}
              {...emailForm.register("firstName")}
            />
            <FormField
              id="lastName"
              label="Last name"
              placeholder="Sharma"
              error={emailForm.formState.errors.lastName?.message}
              {...emailForm.register("lastName")}
            />
          </div>
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
            placeholder="At least 6 characters"
            autoComplete="new-password"
            leadingIcon={<Lock className="h-4 w-4" />}
            error={emailForm.formState.errors.password?.message}
            {...emailForm.register("password")}
          />
          <PrimaryButton
            pending={registerMutation.isPending}
            pendingLabel="Creating account..."
          >
            Create account
          </PrimaryButton>
        </form>
      )}

      {mode === "phone" && (
        <form
          onSubmit={phoneForm.handleSubmit(onPhoneRegister)}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="firstName"
              label="First name"
              placeholder="Rahul"
              leadingIcon={<User className="h-4 w-4" />}
              error={phoneForm.formState.errors.firstName?.message}
              {...phoneForm.register("firstName")}
            />
            <FormField
              id="lastName"
              label="Last name"
              placeholder="Sharma"
              error={phoneForm.formState.errors.lastName?.message}
              {...phoneForm.register("lastName")}
            />
          </div>
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
            pending={registerMutation.isPending}
            pendingLabel="Creating account..."
          >
            Create account
          </PrimaryButton>
        </form>
      )}

      {mode === "google" && (
        <div className="py-4 text-center">
          <GoogleButton onClick={handleGoogleRegister}>
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
          {mode !== "phone" && (
            <TextButton onClick={() => setMode("phone")}>
              <Phone className="mr-1 inline h-3.5 w-3.5" />
              Phone
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
