import * as React from "react";
import { cn } from "@/lib/utils";
import type { PrimaryButtonProps } from "@/types";

export function PrimaryButton({
  pending = false,
  pendingLabel,
  children,
  className,
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      type={props.type ?? "submit"}
      disabled={disabled || pending}
      className={cn(
        "inline-flex w-full mt-4 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  );
}
