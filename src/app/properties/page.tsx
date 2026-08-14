import { Header } from "@/components/layout/Header";
import { SubHero } from "@/components/common/SubHero";
import { PropertyListingsClient } from "@/app/properties/PropertyListingsClient";


export default function PropertiesPage() {
  return (
    <>
      <Header />
      <SubHero
        title="Property Listing"
      />
      <PropertyListingsClient />
    </>
  );
}
