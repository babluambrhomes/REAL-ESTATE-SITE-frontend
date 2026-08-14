import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import toast from "react-hot-toast";

interface GoogleAuthProps {
  AuthType: "LOGIN" | "REGISTER";
}

export function GoogleAuth({ AuthType }: GoogleAuthProps) {
  const handleGoogleRegister = () => {
    if (AuthType === "LOGIN") {
      toast.error("Google Login coming soon");
    } else if (AuthType === "REGISTER") {
      toast.error("Google registration coming soon");
    } else {
      toast.error("Create Some Error");
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleRegister}
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