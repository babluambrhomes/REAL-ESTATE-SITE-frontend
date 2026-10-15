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
    <>
      <SearchHeader />
      {!isSaved && <SubHero title="Property Listing" />}
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-slate-400">Loading properties...</div>}>
        <PropertyListingsClient />
      </Suspense>
    </>
  ); 
}

