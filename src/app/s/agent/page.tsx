"use client";

import { SearchHeader } from "@/components/layout/SearchHeader";
import { Plus, UserPlus, UserCheck, Share2, Users, Ellipsis, MapPin, PhoneCall, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function BrokerListingPage() {


  return (
    <>
      <SearchHeader />
      <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/broker/brokerbg.png')" }}>
        <div className="w-full  pt-24 pb-12">
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
            <button className="absolute right-10 bottom-4 flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-gradient-to-r from-primary to-secondary text-xs font-medium text-white hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" />
              Add Cover Page
            </button>

          </div>


        
        </div>
      </div>
    </>
  );
}
