import { fetcher } from "@/api/fetcher";
import { type CityResponse } from "../api/address";
import useSWRImmutable from "swr/immutable";

const AIMAG_API_KEY = `city`;

export function useCity() {
  const { data, mutate, isLoading, error } = useSWRImmutable(
    AIMAG_API_KEY,
    (url) => fetcher<CityResponse[]>(url),
    {}
  );

  if (data?.success && !error) {
    return { data: data.data, mutate, isLoading };
  }

  return { data: undefined, mutate, isLoading };
}
