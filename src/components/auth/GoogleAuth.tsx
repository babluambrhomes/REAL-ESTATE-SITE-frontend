"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirebaseAuth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import type { GoogleAuthProps } from "@/types";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/lib/features/auth/authMutations";

export function GoogleAuth({ AuthType }: GoogleAuthProps) {
  const router = useRouter();
  const [isPopupLoading, setIsPopupLoading] = React.useState(false);

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const isPending = isPopupLoading || loginMutation.isPending || registerMutation.isPending;

  const handleGoogleAuth = async () => {
    if (isPending) return;

    try {
      setIsPopupLoading(true);
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      const auth = await getFirebaseAuth();
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();

      if (AuthType === "LOGIN") {
        loginMutation.mutate(
          {
            FbTokenId: idToken,
            accessToken: idToken,
          },
          {
            onSuccess: () => {
              toast.success("Logged in successfully");
              router.push("/");
            },
            onError: (err: any) => {
              // If user is not found in database yet, automatically create account and sign in
              const isNotFound =
                err?.response?.status === 404 ||
                err?.response?.data?.message?.toLowerCase().includes("register") ||
                err?.response?.data?.message?.toLowerCase().includes("not found");

              if (isNotFound) {
                registerMutation.mutate(
                  {
                    FbTokenId: idToken,
                    accessToken: idToken,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Account created and logged in!");
                      router.push("/");
                    },
                    onError: (regErr: any) => {
                      toast.error(
                        regErr?.response?.data?.message || "Google registration failed."
                      );
                    },
                  }
                );
              }
            },
          }
        );
      }

      if (AuthType === "REGISTER") {
        registerMutation.mutate(
          {
            FbTokenId: idToken,
            accessToken: idToken,
          },
          {
            onSuccess: () => {
              toast.success("Registered successfully");
              router.push("/");
            },
            onError: (err: any) => {
              toast.error(err?.response?.data?.message || "Google registration failed.");
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

      if (error?.code === "auth/invalid-api-key" || error?.message?.includes("API key")) {
        toast.error("Firebase API key missing in environment variables (.env).");
        return;
      }

      toast.error(
        error?.message || "Google authentication failed. Please try again."
      );
    } finally {
      setIsPopupLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      disabled={isPending}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      )}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
      ) : (
        <Image
          src="/auth/google_logo.png"
          alt="Google"
          width={54}
          height={20}
          className="h-auto"
          style={{ width: "auto", height: "auto" }}
        />
      )}
    </button>
  );
}