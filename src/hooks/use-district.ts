import { DistrictResponse } from "@/api/address";
import { fetcher } from "@/api/fetcher";
import useSWRImmutable from "swr/immutable";

export function getDistrictApiKey(aimag: string) {
  return `/district?aimag_city_code=${aimag}`;
}

export function useDistrict(aimag?: string) {
  const { data, isLoading, mutate, error } = useSWRImmutable(
    getDistrictApiKey(aimag!),
    (url) => fetcher<DistrictResponse[]>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, mutate, isLoading };
  }

  return { data: undefined, mutate, isLoading };
}
