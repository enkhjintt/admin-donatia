import { fetcher } from "@/api/fetcher";
import useSWRImmutable from "swr/immutable";

export function getKhorooApiKey(aimag: string, sum: string) {
  return `/khoroo?aimag_city_code=${aimag}&sum_district_code=${sum}`;
}

export function useKhoroo(aimag?: string, sum?: string) {
  const { data, isLoading, mutate, error } = useSWRImmutable(
    getKhorooApiKey(aimag!, sum!),
    (url) => fetcher<any>(url),
    {}
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return { data: undefined, isLoading, mutate };
}
