import * as React from "react";
import { cn } from "@/lib/utils";

export function TextButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn("text-sm text-primary hover:text-primary/80", className)}
    />
  );
}
