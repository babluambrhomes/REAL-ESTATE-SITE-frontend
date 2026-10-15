import { useQuery } from "@tanstack/react-query";
import { propertyApi, type SearchPropertiesParams } from "./propertyApi";

export const PROPERTY_QUERY_KEYS = {
  all: ["properties"] as const,
  list: (params?: Record<string, any>) => ["properties", "list", params] as const,
  search: (params?: SearchPropertiesParams) => ["properties", "search", params] as const,
  suggestions: (params?: { q?: string; city?: string }) => ["properties", "suggestions", params] as const,
  detail: (slug: string) => ["properties", "detail", slug] as const,
  wishlist: (params?: { page?: number; limit?: number }) => ["properties", "wishlist", params] as const,
};

export function usePropertiesQuery(params?: Record<string, any>) {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.list(params),
    queryFn: () => propertyApi.getProperties(params),
    staleTime: 1000 * 60 * 3, // 3 minutes cache
  });
}

export function useSearchPropertiesQuery(params?: SearchPropertiesParams) {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.search(params),
    queryFn: () => propertyApi.searchProperties(params),
    staleTime: 1000 * 60 * 3,
  });
}

export function useSearchSuggestionsQuery(params?: { q?: string; city?: string }) {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.suggestions(params),
    queryFn: () => propertyApi.getSuggestions(params),
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
}

export function usePropertyDetailQuery(slug: string) {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.detail(slug),
    queryFn: () => propertyApi.getPropertyBySlug(slug),
    enabled: !!slug,
  });
}

export function useWishlistQuery(params?: { page?: number; limit?: number }, enabled = true) {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.wishlist(params),
    queryFn: () => propertyApi.getWishlist(params),
    enabled,
  });
}
