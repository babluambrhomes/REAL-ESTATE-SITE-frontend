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
      <div className="w-full bg-[linear-gradient(180deg,#EEF5FF_0%,#F6FAFF_160px,#FFFFFF_340px)] bg-no-repeat">
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-slate-400">Loading properties...</div>}>
          <PropertyListingsClient />
        </Suspense>
      </div>
    </div>
  ); 
}

