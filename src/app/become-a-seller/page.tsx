"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Image from "next/image";
import { SellerOnboardForm } from "@/components/seller-onboard/SellerOnboardForm";
import { SearchHeader } from "@/components/layout/SearchHeader";
import {
  sellerApi,
  type SellerType,
} from "@/lib/features/seller/sellerApi";
import { useAppSelector } from "@/store/hooks";

export default function SellerOnboard() {
  const { workspaces, activeWorkspaceId } = useAppSelector((state) => state.auth);
  const needsOnboard = workspaces.length === 0 && activeWorkspaceId === null;
  const [sellerType, setSellerType] = useState<SellerType>("INDIVIDUAL");

  const {
    data: meta,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["seller-onboard-meta", sellerType],
    queryFn: () => sellerApi.getOnboardMeta(sellerType),
    enabled: needsOnboard,
  });

  const errorMessage =
    (error as AxiosError<{ message?: string }> | null)?.response?.data?.message ||
    (error instanceof Error ? error.message : "Failed to load onboard metadata.");

  return (
    <main className="min-h-screen bg-white">
      <SearchHeader />

      <section
        className="relative pt-24 sm:pt-28 pb-8 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(196, 214, 255, 0.30) 0%, rgba(126, 188, 245, 0.00) 100%)",
        }}
      >
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-[28px] sm:text-[34px] xl:text-[38px] font-bold text-[#1865F2] leading-[1.2] tracking-tight font-poppins">
              <span className="block whitespace-nowrap">
                One Platform For Selling &amp; Renting
              </span>
              <span className="block mt-1 whitespace-nowrap">
                Properties{" "}
                <span className="relative inline-block text-[#00D084]">
                  With Roofin.Com
                  <span className="absolute bottom-[2px] sm:bottom-[3px] left-0 w-full flex pointer-events-none select-none">
                    <Image
                      src="/post-property/blue_brush_stroke.png"
                      alt=""
                      width={218}
                      height={18}
                      className="w-full h-[8px] sm:h-[10px] object-contain"
                      priority
                    />
                  </span>
                </span>
              </span>
            </h1>

            <p className="text-[14px] sm:text-[14.5px] text-slate-600 leading-relaxed max-w-[420px] font-medium">
              Join Thousands Of Builders, Brokers, And Agents Who Trust Roofin To
              Connect With Genuine Buyers And Tenants.
            </p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(24,101,242,0.10)] backdrop-blur">
            {!needsOnboard ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                You already have a seller profile.
              </div>
            ) : isLoading ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Loading onboard metadata...
              </div>
            ) : isError ? (
              <div className="space-y-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p>{errorMessage}</p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="rounded-lg border border-red-300 bg-white px-3 py-1.5 font-medium"
                >
                  Retry
                </button>
              </div>
            ) : meta ? (
              <SellerOnboardForm
                key={sellerType}
                sellerType={sellerType}
                onSellerTypeChange={setSellerType}
                meta={meta}
              />
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
