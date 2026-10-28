import { apiClient } from "@/lib/axios";

export interface ApiEnquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status: "NEW" | "CONTACTED" | "SITE_VISIT" | "CONVERTED" | "NOT_RESPOND" | "CANCELLED";
  comment?: string;
  createdAt: string;
  property?: {
    id: string;
    title: string;
    city?: string;
    propertyType?: string;
    minPrice?: number | string;
  };
}

export interface ApiSiteVisit {
  id: string;
  visitDate: string;
  startTime: string;
  endTime?: string;
  status: "REQUESTED" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";
  meetingPoint?: string;
  comment?: string;
  name?: string;
  phone?: string;
  email?: string;
  createdAt: string;
  property?: {
    id: string;
    title: string;
    city?: string;
  };
}

export const crmApi = {
  // Fetch seller's enquiries / leads
  getEnquiries: (params?: { page?: number; limit?: number; status?: string; search?: string }) =>
    apiClient
      .get<{ statusCode: number; success: boolean; data: { data: ApiEnquiry[]; meta: any } }>(
        "/enquiries/me",
        { params }
      )
      .then((res) => res.data),

  // Get lead metrics & counts
  getEnquiryStats: () =>
    apiClient
      .get<{ statusCode: number; success: boolean; data: Record<string, number> }>(
        "/enquiries/me/stats"
      )
      .then((res) => res.data),

  // Update lead status (e.g. NEW -> CONTACTED -> SITE_VISIT)
  updateEnquiryStatus: (id: string, status: string) =>
    apiClient
      .patch(`/enquiries/me/${id}/status`, { status })
      .then((res) => res.data),

  // Update notes/comment for a lead
  updateEnquiryComment: (id: string, comment: string) =>
    apiClient
      .put(`/enquiries/me/${id}/comment`, { comment })
      .then((res) => res.data),

  // Delete an inquiry
  deleteEnquiry: (id: string) =>
    apiClient
      .delete(`/enquiries/me/${id}`)
      .then((res) => res.data),

  // Get seller's site visits
  getSellerSiteVisits: (params?: { page?: number; limit?: number; status?: string }) =>
    apiClient
      .get<{ statusCode: number; success: boolean; data: { data: ApiSiteVisit[]; meta: any } }>(
        "/site-visits/seller",
        { params }
      )
      .then((res) => res.data),

  // Get site visit counts & stats
  getSellerSiteVisitStats: () =>
    apiClient
      .get<{ statusCode: number; success: boolean; data: Record<string, number> }>(
        "/site-visits/seller/stats"
      )
      .then((res) => res.data),

  // Confirm / Complete / Cancel site visit
  updateSiteVisitStatus: (id: string, status: string) =>
    apiClient
      .patch(`/site-visits/seller/${id}/status`, { status })
      .then((res) => res.data),

  // Reschedule site visit
  rescheduleSiteVisit: (id: string, data: { visitDate: string; startTime: string; reason?: string }) =>
    apiClient
      .patch(`/site-visits/seller/${id}/reschedule`, data)
      .then((res) => res.data),
};
