import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { AppDispatch, RootState } from "@/store/store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const REFRESH_URL = "/auth/refresh";

const isRefreshRequest = (config: { url?: string } | undefined) =>
  config?.url === REFRESH_URL;

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

type StoreRef = { getState: () => RootState; dispatch: AppDispatch };

let storeRef: StoreRef | null = null;

export function injectStore(store: StoreRef) {
  storeRef = store;
}

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

let isRefreshing = false;

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
}

const attachAuthHeader = (config: InternalAxiosRequestConfig) => {
  if (isRefreshRequest(config)) return config;

  const state = storeRef?.getState();
  const token =
    state?.auth?.accessToken || state?.auth?.verificationToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

apiClient.interceptors.request.use(attachAuthHeader, (error) => Promise.reject(error));

const handleResponseError = async (error: AxiosError<{ code?: string }>) => {
  const originalRequest = error.config as RetryConfig | undefined;

  if (!originalRequest) {
    return Promise.reject(error);
  }

  if (isRefreshRequest(originalRequest)) {
    return Promise.reject(error);
  }

  if (
    error.response?.status === 401 &&
    error.response?.data?.code === "TOKEN_EXPIRED" &&
    !originalRequest._retry
  ) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const state = storeRef?.getState();
      const refreshToken = state?.auth?.refreshToken;

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const { data } = await apiClient.post<{
        data: { accessToken: string; refreshToken: string };
      }>(REFRESH_URL, { refreshToken });

      const { accessToken, refreshToken: newRefreshToken } = data.data;

      storeRef?.dispatch({
        type: "auth/tokensRefreshed",
        payload: { accessToken, refreshToken: newRefreshToken },
      });

      processQueue(null, accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      storeRef?.dispatch({ type: "auth/logout" });
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  return Promise.reject(error);
};

apiClient.interceptors.response.use((response) => response, handleResponseError);
