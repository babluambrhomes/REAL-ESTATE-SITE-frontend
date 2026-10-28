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

  // Helper to validate UUID
  isUUID: (str?: string) =>
    Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)),

  // Submit enquiry lead to seller / dealer
  submitEnquiry: (data: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
    propertyId?: string;
    sellerId?: string;
  }) => {
    const isUUID = (str?: string) =>
      Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str));
    const payload: any = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || undefined,
      message: data.message?.trim() || undefined,
    };
    if (isUUID(data.propertyId)) payload.propertyId = data.propertyId;
    if (isUUID(data.sellerId)) payload.sellerId = data.sellerId;

    return apiClient.post("/enquiries", payload).then((res) => res.data);
  },

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
  }) => {
    const isUUID = (str?: string) =>
      Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str));
    const payload: any = {
      visitDate: data.visitDate,
      startTime: data.startTime,
      endTime: data.endTime,
      name: data.name?.trim(),
      phone: data.phone?.trim(),
      email: data.email?.trim(),
      message: data.message?.trim(),
    };
    if (isUUID(data.propertyId)) payload.propertyId = data.propertyId;
    if (isUUID(data.sellerId)) payload.sellerId = data.sellerId;

    return apiClient.post("/site-visits", payload).then((res) => res.data);
  },

  // Create new property listing (Verified Seller)
  createProperty: (data: any) =>
    apiClient
      .post("/properties", data)
      .then((res) => res.data),

  // Upload images for a property
  uploadPropertyImages: (propertyId: string, formData: FormData) =>
    apiClient
      .post(`/properties/${propertyId}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),

  // Get current logged-in seller's properties
  getMyProperties: (params?: Record<string, any>) =>
    apiClient
      .get("/properties/my", { params })
      .then((res) => res.data),

  // Get specific seller property by ID
  getMyProperty: (id: string) =>
    apiClient
      .get(`/properties/my/${id}`)
      .then((res) => res.data),

  // Update property listing
  updateProperty: (id: string, data: any) =>
    apiClient
      .patch(`/properties/${id}`, data)
      .then((res) => res.data),

  // Update property status (AVAILABLE, UNDER_OFFER, SOLD, RENTED, etc.)
  updatePropertyStatus: (id: string, status: string) =>
    apiClient
      .patch(`/properties/${id}/status`, { propertyStatus: status })
      .then((res) => res.data),

  // Delete property listing
  deleteProperty: (id: string) =>
    apiClient
      .delete(`/properties/${id}`)
      .then((res) => res.data),
};
