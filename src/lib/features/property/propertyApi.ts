import { apiClient } from "@/lib/axios";

export interface PropertyVariant {
  id: string;
  variantName: string;
  bedrooms: number;
  bathrooms?: number;
  price: string | number;
  mrpPrice?: string | number;
  pricePerSqft?: string | number;
  totalArea: string | number;
  totalAreaUnit: string;
  furnishingStatus?: string;
  availabilityStatus?: string;
  isAvailable?: boolean;
  images?: Array<{ url: string; isFeatured?: boolean }>;
}

export interface PropertySeller {
  id: string;
  referenceCode?: string;
  slug?: string;
  sellerType?: string;
  headline?: string;
  logoUrl?: string | null;
}

export interface ApiProperty {
  id: string;
  propertyCode: string;
  title: string;
  slug: string;
  description: string;
  transactionType: "SALE" | "RENT";
  propertyType: string;
  propertyStatus: string;
  city: string;
  state: string;
  pincode: string;
  addressLine?: string;
  latitude?: string;
  longitude?: string;
  featuredImage: string;
  isFeatured: boolean;
  isVerified: boolean;
  viewsCount: number;
  likesCount: number;
  averageRating: string | number;
  ratingCount: number;
  createdAt: string;
  imagesCount?: number;
  seller?: PropertySeller;
  minPrice?: string | number;
  variants?: PropertyVariant[];
  variant?: PropertyVariant;
}

export interface PropertyListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: ApiProperty[];
    meta: {
      total: number;
      page: number;
      limit: number;
      pages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export interface SearchPropertiesParams {
  page?: number;
  limit?: number;
  q?: string;
  city?: string;
  state?: string;
  locality?: string;
  transactionType?: "SALE" | "RENT";
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bhk?: string;
  sort?: "newest" | "price_asc" | "price_desc" | "popular" | "relevance";
}

export interface SearchSuggestionsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    cities: Array<{ city: string; count: number }>;
    priceRanges: Array<{ label: string; min: number; max: number | null; count: number }>;
    propertyTypes: Array<{ type: string; count: number }>;
    bhkOptions: Array<{ bedrooms: number; count: number }>;
    trendingSearches?: string[];
  };
}

export interface PropertyDetailResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ApiProperty;
}

export const propertyApi = {
  // Get all properties with pagination & basic filters
  getProperties: (params?: Record<string, any>) =>
    apiClient
      .get<PropertyListResponse>("/properties", { params })
      .then((res) => res.data),

  // Search properties with rich filters (city, type, price, etc.)
  searchProperties: (params?: SearchPropertiesParams) =>
    apiClient
      .get<PropertyListResponse>("/search/properties", { params })
      .then((res) => res.data),

  // Get live suggestions for dropdowns (cities, property types, budgets)
  getSuggestions: (params?: { q?: string; city?: string }) =>
    apiClient
      .get<SearchSuggestionsResponse>("/search/suggestions", { params })
      .then((res) => res.data),

  // Get single property details by slug
  getPropertyBySlug: (slug: string) =>
    apiClient
      .get<PropertyDetailResponse>(`/properties/${slug}`)
      .then((res) => res.data),

  // Get user's saved properties from backend
  getWishlist: (params?: { page?: number; limit?: number }) =>
    apiClient
      .get<PropertyListResponse>("/users/wishlist", { params })
      .then((res) => res.data),

  // Submit enquiry lead to seller / dealer
  submitEnquiry: (data: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
    propertyId?: string;
    sellerId?: string;
  }) =>
    apiClient
      .post("/enquiries", data)
      .then((res) => res.data),

  // Book a site tour
  bookSiteVisit: (data: {
    propertyId?: string;
    sellerId?: string;
    visitDate: string;
    startTime: string;
    endTime?: string;
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
  }) =>
    apiClient
      .post("/site-visits", data)
      .then((res) => res.data),
};
