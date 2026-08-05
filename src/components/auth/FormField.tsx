"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  labelEnd?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function FormField({
  id,
  label,
  error,
  leadingIcon,
  labelEnd,
  className,
  ...inputProps
}: FormFieldProps) {
  const isPassword = inputProps.type === "password";
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-gray-900">
          {label}
        </label>
        {labelEnd}
      </div>
      <div className="relative">
        {leadingIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leadingIcon}
          </span>
        )}
        <input
          id={id}
          {...inputProps}
          type={isPassword && showPassword ? "text" : inputProps.type}
          className={cn(
            "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
            leadingIcon && "pl-10",
            isPassword && "pr-10",
            error
              ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500"
              : "border-gray-300 focus-visible:border-primary focus-visible:ring-primary",
            className
          )}
        />
        {isPassword && (
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
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
