import { apiClient } from "@/lib/axios";

export interface SellerOrganization {
  name: string;
  description?: string;
  website?: string;
  registrationNumber?: string;
  gstNumber?: string;
  yearEstablished?: number;
  employeeCount?: number;
}

export interface SellerProfile {
  id: string;
  sellerType: "INDIVIDUAL" | "ORGANIZATION";
  name?: string;
  slug?: string;
  headline?: string;
  about?: string;
  experienceYears?: number;
  contactPhone?: string;
  contactEmail?: string;
  panNumber?: string;
  aadhaarNumber?: string;
  reraNumber?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  addressLine?: string;
  isVerified?: boolean;
  isKycVerified?: boolean;
  logoUrl?: string | null;
  coverUrl?: string | null;
  organization?: SellerOrganization | null;
  specializations?: string[];
  languages?: string[];
  happyClientsCount?: number;
  responseTimeMinutes?: number;
  socialLinks?: Array<{ platform: string; url: string }>;
}

export interface BecomeSellerInput {
  sellerType: "INDIVIDUAL" | "ORGANIZATION";
  name?: string;
  panNumber?: string;
  aadhaarNumber?: string;
  reraNumber?: string;
  categoryId: string;
  organization?: SellerOrganization;
  headline?: string;
  about?: string;
  contactPhone?: string;
  contactEmail?: string;
  city?: string;
  state?: string;
  pincode?: string;
  addressLine?: string;
}

export const sellerApi = {
  // Get seller categories
  getCategories: () =>
    apiClient.get("/sellers/categories").then((res) => res.data),

  // Apply to become a seller
  becomeSeller: (data: BecomeSellerInput) =>
    apiClient.post("/sellers/become-seller", data).then((res) => res.data),

  // Get current logged-in seller profile
  getMyProfile: () =>
    apiClient.get<{ success: boolean; data: SellerProfile }>("/sellers/me").then((res) => res.data),

  // Update current seller profile
  updateMyProfile: (data: Partial<SellerProfile>) =>
    apiClient.put("/sellers/me", data).then((res) => res.data),

  // Update seller vanity slug
  updateMySlug: (slug: string) =>
    apiClient.patch("/sellers/me/slug", { slug }).then((res) => res.data),

  // Upload seller logo
  updateLogo: (formData: FormData) =>
    apiClient
      .put("/sellers/me/logo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),

  // Upload seller banner cover
  updateCover: (formData: FormData) =>
    apiClient
      .put("/sellers/me/cover", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),

  // Get public seller/builder/broker profile by slug
  getPublicProfile: (slug: string) =>
    apiClient.get(`/sellers/${slug}`).then((res) => res.data),

  // KYC documents
  getKycDocuments: () =>
    apiClient.get("/sellers/kyc/documents").then((res) => res.data),

  uploadKycDocument: (formData: FormData) =>
    apiClient
      .post("/sellers/kyc/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),

  deleteKycDocument: (docId: string) =>
    apiClient.delete(`/sellers/kyc/documents/${docId}`).then((res) => res.data),
};
