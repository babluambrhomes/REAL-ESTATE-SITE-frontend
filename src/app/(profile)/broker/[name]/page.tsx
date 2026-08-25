"use client";

import { SearchHeader } from "@/components/layout/SearchHeader";
import { Plus, UserPlus, UserCheck, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function BrokerProfilePage() {


  return (
    <>
      <SearchHeader />

      <div className="w-full p-10 pt-24 pb-12">
        {/* Cover Image */}
        <div className="relative w-full h-44 overflow-hidden bg-gray-100">
          <Image
            src="/broker/bg_image.png"
            alt="Cover"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <button className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-700 hover:bg-white transition-colors">
            <Plus className="w-4 h-4" />
            Add Cover Page
          </button>
        </div>

        {/* Profile Info */}
        <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-12 sm:-mt-14 px-2">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-20 overflow-hidden ring-4 ring-white shadow-md bg-gray-100">
              <Image
                src="/broker/broker.png"
                alt="Broker"
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
              <Image
                src="/broker/verified_tick.png"
                alt="Verified"
                width={18}
                height={18}
              />
            </div>
          </div>

          {/* Name & Actions */}
          <div className="flex-1 text-center sm:text-left pb-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Jitender Singh
              </h1>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              Senior Property Consultant
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-3">
              <button
               
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all bg-gray-100 text-gray-700 border border-gray-200`}
              >
                <UserPlus className="w-4 h-4" />
               Following
              </button>
              <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Verified Badge & Stats */}
          <div className="flex flex-col items-center sm:items-end gap-3 pb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-medium text-white">
              Roofin Verified Broker
            </span>
            <div className="flex items-center gap-4 text-center">
              <div>
                <p className="text-base font-semibold text-gray-900">
                  200
                </p>
                <p className="text-[11px] text-gray-500">Followers</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-base font-semibold text-gray-900">132K</p>
                <p className="text-[11px] text-gray-500">Views</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-base font-semibold text-gray-900">500+</p>
                <p className="text-[11px] text-gray-500">Listings</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-base font-semibold text-gray-900">20</p>
                <p className="text-[11px] text-gray-500">Videos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
