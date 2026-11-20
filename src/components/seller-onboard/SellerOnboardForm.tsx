"use client";

import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { authApi } from "@/lib/features/auth/authApi";
import {
  sellerApi,
  type OnboardMeta,
  type OnboardPayload,
  type SellerType,
} from "@/lib/features/seller/sellerApi";
import { useAppDispatch } from "@/store/hooks";
import { hydrateWorkspaces } from "@/store/slice/authSlice";

interface SellerOnboardFormProps {
  sellerType: SellerType;
  onSellerTypeChange: (sellerType: SellerType) => void;
  meta: OnboardMeta;
}

type ServerErrorResponse = {
  message?: string;
  data?: unknown;
};

type FieldErrors = {
  categoryId?: string;
  name?: string;
};

const OPTIONS: Array<{ value: SellerType; label: string }> = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "ORGANIZATION", label: "Organization" },
];

const controlClass =
  "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#1865F2] focus:ring-2 focus:ring-[#1865F2]/20 disabled:bg-slate-50";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getMessage(value: unknown, fallback: string): string {
  if (isRecord(value) && typeof value.message === "string" && value.message.trim()) {
    return value.message;
  }
  return fallback;
}

function getFieldError(data: unknown, field: string): string | undefined {
  if (!Array.isArray(data)) return undefined;

  for (const item of data) {
    if (!isRecord(item)) continue;
    if (item.field === field && typeof item.message === "string") {
      return item.message;
    }
  }

  return undefined;
}

export function SellerOnboardForm({ sellerType, onSellerTypeChange, meta }: SellerOnboardFormProps) {
  const dispatch = useAppDispatch();
  const [categoryId, setCategoryId] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const submitMutation = useMutation({
    mutationFn: (payload: OnboardPayload) =>
      sellerApi.submitOnboard(sellerType, payload),
  });

  const canSubmit =
    sellerType === "INDIVIDUAL"
      ? meta.eligibility.canBecomeIndividualSeller
      : meta.eligibility.canCreateOrganization;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || submitMutation.isPending) return;

    const trimmedName = organizationName.trim();
    const errors: FieldErrors = {};

    if (!categoryId) {
      errors.categoryId = "Please select a category.";
    }

    if (sellerType === "ORGANIZATION") {
      if (!trimmedName) {
        errors.name = "Organization name is required.";
      } else if (trimmedName.length < 2 || trimmedName.length > 200) {
        errors.name = "Organization name must be between 2 and 200 characters.";
      }
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const payload: OnboardPayload =
      sellerType === "INDIVIDUAL"
        ? { categoryId }
        : { name: trimmedName, categoryId };

    try {
      const result = await submitMutation.mutateAsync(payload);
      const workspaces = await authApi.getWorkspaces();
      dispatch(hydrateWorkspaces(workspaces));

      const fallback =
        sellerType === "INDIVIDUAL"
          ? "Seller account created and verified"
          : "Organization created. You are its owner — complete company KYC before publishing listings.";
      toast.success(getMessage(result, fallback));

      setCategoryId("");
      setOrganizationName("");
      setFieldErrors({});
    } catch (error) {
      const response = (error as AxiosError<ServerErrorResponse>).response?.data;
      toast.error(getMessage(response, "Something went wrong"));

      const nextErrors: FieldErrors = {};
      const categoryError = getFieldError(response?.data, "categoryId");
      const nameError = getFieldError(response?.data, "name");
      if (categoryError) nextErrors.categoryId = categoryError;
      if (nameError) nextErrors.name = nameError;
      setFieldErrors(nextErrors);
    }
  };

  return (
    <div className="space-y-5 ">
     

      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map((option) => {
          const isActive = sellerType === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSellerTypeChange(option.value)}
              aria-pressed={isActive}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-[#1865F2] bg-[#1865F2] text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#1865F2]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {!canSubmit ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          {meta.eligibility.reason || "You are not eligible for this seller type yet."}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        {sellerType === "ORGANIZATION" ? (
          <div>
            <label htmlFor="onboard-organization-name" className="block text-sm font-medium text-slate-800">
              Organization name <span className="text-red-500">*</span>
            </label>
            <input
              id="onboard-organization-name"
              type="text"
              className={controlClass}
              placeholder="Organization name"
              value={organizationName}
              disabled={!canSubmit}
              onChange={(event) => {
                setOrganizationName(event.target.value);
                setFieldErrors((previous) => ({ ...previous, name: undefined }));
              }}
            />
            {fieldErrors.name ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
            ) : null}
          </div>
        ) : null}

        <div>
          <label htmlFor="onboard-category" className="block text-sm font-medium text-slate-800">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="onboard-category"
            className={controlClass}
            value={categoryId}
            disabled={!canSubmit}
            onChange={(event) => {
              setCategoryId(event.target.value);
              setFieldErrors((previous) => ({ ...previous, categoryId: undefined }));
            }}
          >
            <option value="">Select a category</option>
            {meta.categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {fieldErrors.categoryId ? (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.categoryId}</p>
          ) : null}
        </div>

        <PrimaryButton
          type="submit"
          disabled={!canSubmit}
          pending={submitMutation.isPending}
          pendingLabel="Submitting..."
        >
          Continue
        </PrimaryButton>
      </form>
    </div>
  );
}
