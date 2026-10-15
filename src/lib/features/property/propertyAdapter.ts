import type { ApiProperty } from "./propertyApi";
import type { Property } from "@/types";

const CURATED_FALLBACK_GALLERIES: Record<string, string[]> = {
  FARM_HOUSE: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
  ],
  VILLA: [
    "/images/properties/villa-popular-figma.jpg",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  ],
  APARTMENT: [
    "/images/properties/tower-popular-figma.jpg",
    "/images/properties/max-estate-tower-figma.jpg",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85",
  ],
  PENTHOUSE: [
    "/images/properties/modern-white-penthouse.jpg",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  ],
  COMMERCIAL: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=85",
  ],
  HOUSE: [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  ],
};

export function formatPriceInr(num: number): string {
  if (!num || isNaN(num)) return "Price on Request";
  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2);
    return `₹${cr.replace(/\.00$/, "")} Cr`;
  }
  if (num >= 100000) {
    const lac = (num / 100000).toFixed(2);
    return `₹${lac.replace(/\.00$/, "")} Lac`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}

export function mapApiPropertyToUi(apiProp: ApiProperty): Property {
  const variant = apiProp.variant || apiProp.variants?.[0];
  const priceNum = Number(variant?.price || apiProp.minPrice || 0);
  const mrpNum = Number(variant?.mrpPrice || 0);

  const rawImages: string[] = [];
  if (apiProp.featuredImage) {
    rawImages.push(apiProp.featuredImage);
  }
  if ((apiProp as any).images?.length) {
    (apiProp as any).images.forEach((img: any) => {
      if (typeof img === "string") rawImages.push(img);
      else if (img?.url) rawImages.push(img.url);
    });
  }
  if (variant?.images?.length) {
    variant.images.forEach((img: any) => {
      if (typeof img === "string") rawImages.push(img);
      else if (img?.url) rawImages.push(img.url);
    });
  }

  // Normalize property type
  const rawType = (apiProp.propertyType || "APARTMENT").toUpperCase();
  const typeKey =
    rawType.includes("FARM") ? "FARM_HOUSE" :
    rawType.includes("VILLA") ? "VILLA" :
    rawType.includes("PENTHOUSE") ? "PENTHOUSE" :
    rawType.includes("COMMERCIAL") ? "COMMERCIAL" :
    rawType.includes("HOUSE") ? "HOUSE" : "APARTMENT";

  const curatedPool = CURATED_FALLBACK_GALLERIES[typeKey] || CURATED_FALLBACK_GALLERIES.APARTMENT;

  // Filter out dummy backend seed strings (/uploads/seed/...) that do not exist on the remote server
  const backendBase = "https://roofin-backend.ambrhomes.work.gd";
  const validImages: string[] = [];

  for (const img of rawImages) {
    if (!img) continue;
    // If it's a seed dummy string from backend database seed script, skip to use curated pool
    if (img.includes("/uploads/seed/") || img.includes("property-") && img.endsWith(".jpg")) {
      continue;
    }
    if (img.startsWith("http")) {
      validImages.push(img);
    } else {
      const cleanPath = img.startsWith("/") ? img : `/${img}`;
      validImages.push(`${backendBase}${cleanPath}`);
    }
  }

  // If no valid uploaded images exist, supply curated HD gallery
  const normalizedImages = validImages.length > 0 ? Array.from(new Set(validImages)) : curatedPool;

  // Extract video tour URL if provided by backend
  const videoTour = (apiProp as any).videos?.[0]?.url || (apiProp as any).videoUrl || undefined;

  const bedrooms = variant?.bedrooms ?? 2;
  const bathrooms = variant?.bathrooms ?? Math.max(1, bedrooms - 1);
  const area = variant?.totalArea ? `${variant.totalArea} ${variant.totalAreaUnit || "sqft"}` : "1,200 sqft";

  const locationStr = [apiProp.addressLine, apiProp.city, apiProp.state]
    .filter(Boolean)
    .join(", ");

  const discountPercent =
    mrpNum > priceNum && priceNum > 0
      ? `${Math.round(((mrpNum - priceNum) / mrpNum) * 100)}% off`
      : undefined;

  return {
    id: apiProp.id,
    slug: apiProp.slug,
    title: apiProp.title,
    location: locationStr || `${apiProp.city || "Noida"}, Uttar Pradesh`,
    city: apiProp.city || "Noida",
    type: (apiProp.propertyType || "APARTMENT").replace(/_/g, " "),
    price: formatPriceInr(priceNum),
    priceValue: priceNum,
    originalPrice: mrpNum > priceNum ? formatPriceInr(mrpNum) : undefined,
    discount: discountPercent,
    beds: `${bedrooms} Beds`,
    baths: bathrooms,
    area,
    verifiedText: apiProp.isVerified ? "Verified" : "Featured",
    chips: [
      apiProp.transactionType === "SALE" ? "For Sale" : "For Rent",
      (apiProp.propertyType || "Apartment").replace(/_/g, " "),
    ],
    phone: "Contact Seller",
    description: apiProp.description || "",
    images: normalizedImages,
    coordinates:
      apiProp.latitude && apiProp.longitude
        ? [Number(apiProp.latitude), Number(apiProp.longitude)]
        : undefined,
    seller: apiProp.seller,
    variants: apiProp.variants,
    reraNumber: (apiProp as any).reraNumber,
    amenities: (apiProp as any).amenities,
    videoUrl: videoTour,
  };
}
