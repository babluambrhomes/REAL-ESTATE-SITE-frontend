"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";

import type { GoogleAuthProps } from "@/types";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/lib/features/auth/authMutations";

export function GoogleAuth({ AuthType }: GoogleAuthProps) {
  const router = useRouter();

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      console.log("Firebase project:", auth.app.options.projectId);
      console.log("Firebase authDomain:", auth.app.options.authDomain);
      console.log("Firebase API key:", auth.app.options.apiKey);

      const result = await signInWithPopup(auth, provider);

      const accessToken = await result.user.getIdToken();

      console.log("FIREBASE ID TOKEN:", accessToken);

      if (AuthType === "LOGIN") {
        loginMutation.mutate(
          {
            accessToken,
          },
          {
            onSuccess: () => {
              toast.success("Logged in successfully");
              router.push("/");
            },
          }
        );
      }

      if (AuthType === "REGISTER") {
        registerMutation.mutate(
          {
            accessToken,
          },
          {
            onSuccess: () => {
              toast.success("Registered successfully");
              router.push("/");
            },
          }
        );
      }
    } catch (error: any) {
      console.error("Google authentication error:", error);

      if (error?.code === "auth/popup-closed-by-user") {
        return;
      }

      if (error?.code === "auth/popup-blocked") {
        toast.error("Please allow popups for this website.");
        return;
      }

      toast.error(
        error?.message || "Google authentication failed. Please try again."
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      )}
    >
      <Image
        src="/auth/google_logo.png"
        alt="Google"
        width={54}
        height={20}
        className="h-auto"
      />
    </button>
  );
}