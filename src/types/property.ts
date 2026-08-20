export interface PropertyInfoChip {
  value: string;
  label: string;
  Icon: string;
}

export interface NearbyItem {
  label: string;
}

export interface Property {
  id?: number | string;
  images: string[];
  verifiedText: string;
  chips: string[];
  infoChips?: PropertyInfoChip[];
  title: string;
  phone: string;
  location: string;
  coordinates?: [number, number];
  price: string;
  originalPrice?: string;
  priceValue?: number;
  city: string;
  type: string;
  beds: string;
  baths?: number;
  area?: string;
  discount?: string;
  description?: string;
  nearby?: NearbyItem[];
  layout?: "vertical" | "horizontal" | "mapcard";
}

export interface MapComponentProps {
  height?: string;
  properties?: Property[];
}
