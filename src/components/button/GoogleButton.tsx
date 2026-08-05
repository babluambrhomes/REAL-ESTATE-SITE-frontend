import * as React from "react";
import { cn } from "@/lib/utils";
import { GoogleIcon } from "@/components/auth/GoogleIcon";

export function GoogleButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
    >
      <GoogleIcon className="h-5 w-5" />
      {children}
    </button>
  );
}
