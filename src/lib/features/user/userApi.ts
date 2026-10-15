import { apiClient } from "@/lib/axios";
import type { User } from "@/types";

export interface UserProfileResponse {
  statusCode: number;
  data: User;
  message: string;
}

export interface UpdateUserProfileInput {
  firstName?: string;
  lastName?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  city?: string;
  state?: string;
  country?: string;
}

export const userApi = {
  getProfile: () =>
    apiClient
      .get<UserProfileResponse>("/users/profile")
      .then((res) => res.data),

  updateProfile: (data: UpdateUserProfileInput) =>
    apiClient
      .put<UserProfileResponse>("/users/profile", data)
      .then((res) => res.data),

  updateAvatar: (formData: FormData) =>
    apiClient
      .put<UserProfileResponse>("/users/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),
};
