"use client";

import { SearchHeader } from "@/components/layout/SearchHeader";
import { Plus, UserPlus, UserCheck, Share2, Users, Ellipsis, MapPin, PhoneCall, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function BrokerProfilePage() {


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


          <div className="px-10">
            <div className="relative flex flex-col sm:flex-row items-center sm:items-end -mt-8 gap-8  px-2">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-36 h-36 overflow-hidden border-2 ring-12 ring-gray-50 border-primary rounded-2xl  shadow-2xl bg-green-200">
                  <Image
                    src="/broker/broker.png"
                    alt="Broker"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-0.5 shadow-sm">
                  <Image
                    src="/broker/ai_icon.png"
                    alt="Verified"
                    width={30}
                    height={30}
                  />
                </div>
              </div>

              {/* Name & Actions */}
              <div className="flex-1 text-center sm:text-left pb-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Jitender Singh
                  </h1>
                  <Image src='/broker/verified_tick.png' alt='' width={16} height={16} />
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  Senior Property Consultant
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-3">
                  <button
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-medium transition-all bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90`}
                  >
                    <Users className="w-4 h-4" />
                    Fallow
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>

                </div>
              </div>

              {/* Verified Badge & Stats */}
              <div className="flex flex-col items-center sm:items-end gap-3 pb-1">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-primary/10 border uppercase border-gray-300 text-[10px] font-medium text-primary ">
                  <Image
                    src="/broker/verified.png"
                    alt="Verified"
                    width={10}
                    height={10}
                  />   Roofin   Broker
                </span>
                <div className="flex items-center gap-6 text-center">
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium">Followers</p>
                    <p className="text-base font-semibold text-primary">200</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium">Views</p>
                    <p className="text-base font-semibold text-primary">132</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium">Listing</p>
                    <p className="text-base font-semibold text-primary">500</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium">Videos</p>
                    <p className="text-base font-semibold text-primary">20</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-14 ">
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-800"> <Image src='/broker/verified.png' alt="" width={20} height={20} /> 12+ years of experience</h4>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-amber-500 text-sm">
                    {[1, 2, 3, 4, 5].map((i) => {
                      const fillPercent = Math.min(Math.max((4.5 - (i - 1)) * 100, 0), 100);
                      return (
                        <div key={i} className="relative w-4 h-4">
                          <Star className="absolute inset-0 w-4 h-4 text-gray-200" />
                          <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-sm font-semibold text-primary">4.5/5</span>
                  <span className="text-xs text-gray-500">(320 Verified Reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-primary" /> <span>Operating in: Noida, Greater Noida, Ghaziabad</span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button className="flex items-center gap-2 px-3 py-1 rounded-md bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium hover:opacity-90 transition-opacity">
                    <Image src='/broker/usercall.png' alt="" width={16} height={16} /> Contact Broker
                  </button>
                  <button className="px-3 py-1 flex gap-2 items-center rounded-md border border-primary text-sm font-medium text-primary hover:bg-gray-50 transition-colors">
                    <PhoneCall className="w-4 h-4" />  Request Callback
                  </button>
                </div>
              </div>
              <div>
                
              </div>
            </div>






          </div>
        </div>
      </div>
    </>
  );
}
