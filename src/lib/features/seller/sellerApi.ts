import { apiClient } from "@/lib/axios";

export type SellerType = "INDIVIDUAL" | "ORGANIZATION";

export const SUBMIT_URL = {
  INDIVIDUAL: "/sellers/become-seller",
  ORGANIZATION: "/organizations",
} as const;

export interface OnboardCategory {
  value: string;
  label: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}

export interface OnboardMeta {
  sellerType: SellerType;
  eligibility: {
    canBecomeIndividualSeller: boolean;
    canCreateOrganization: boolean;
    reason: string | null;
  };
  categories: OnboardCategory[];
}

export type IndividualOnboardPayload = {
  categoryId: string;
};

export type OrganizationOnboardPayload = {
  name: string;
  categoryId: string;
};

export type OnboardPayload = IndividualOnboardPayload | OrganizationOnboardPayload;

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
  sellerType: SellerType;
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
  sellerType: SellerType;
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
  getCategories: () =>
    apiClient.get("/sellers/categories").then((res) => res.data),

  getOnboardMeta: (sellerType: SellerType) =>
    apiClient
      .get<{ data: OnboardMeta }>("/sellers/onboarding-fields", {
        params: { sellerType },
      })
      .then((res) => res.data.data),

  submitOnboard: (sellerType: SellerType, payload: OnboardPayload) =>
    apiClient.post(SUBMIT_URL[sellerType], payload).then((res) => res.data),

  becomeSeller: (data: BecomeSellerInput) =>
    apiClient.post("/sellers/become-seller", data).then((res) => res.data),

  getMyProfile: () =>
    apiClient.get<{ success: boolean; data: SellerProfile }>("/sellers/me").then((res) => res.data),

  updateMyProfile: (data: Partial<SellerProfile>) =>
    apiClient.put("/sellers/me", data).then((res) => res.data),

  updateMySlug: (slug: string) =>
    apiClient.patch("/sellers/me/slug", { slug }).then((res) => res.data),

  updateLogo: (formData: FormData) =>
    apiClient
      .put("/sellers/me/logo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),

  updateCover: (formData: FormData) =>
    apiClient
      .put("/sellers/me/cover", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),

  getPublicProfile: (slug: string) =>
    apiClient.get(`/sellers/${slug}`).then((res) => res.data),

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
