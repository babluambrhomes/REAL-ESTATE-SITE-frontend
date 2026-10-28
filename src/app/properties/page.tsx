import { Suspense } from "react";
import { SearchHeader } from "@/components/layout/SearchHeader";
import { SubHero } from "@/components/common/SubHero";
import { PropertyListingsClient } from "@/app/properties/PropertyListingsClient";

export default async function PropertiesPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : {};
  const isSaved = searchParams?.saved === "true";

  return (
    <div className="min-h-screen bg-white">
      <SearchHeader />
      {!isSaved && <SubHero title="Property Listing" />}
      <div className="relative w-full bg-white">
        {/* Subtle top-to-bottom soft blue gradient below the banner fading smoothly to pure white */}
        {!isSaved && (
          <div
            className="absolute inset-x-0 top-0 h-[520px] sm:h-[580px] pointer-events-none -z-0"
            style={{
              background:
                "linear-gradient(180deg, #EEF6FE 0%, rgba(238, 246, 254, 0.65) 45%, rgba(238, 246, 254, 0.15) 75%, #FFFFFF 100%)",
            }}
          />
        )}
        <div className="relative z-10">
          <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-slate-400">Loading properties...</div>}>
            <PropertyListingsClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

