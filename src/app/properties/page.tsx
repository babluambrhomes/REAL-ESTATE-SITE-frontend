import { SearchHeader } from "@/components/layout/SearchHeader";
import { SubHero } from "@/components/common/SubHero";
import { PropertyListingsClient } from "@/app/properties/PropertyListingsClient";


export default function PropertiesPage() {
  return (
    <>
      <SearchHeader />
      <SubHero
        title="Property Listing"
      />
      <PropertyListingsClient />
    </>
  ); 
}
