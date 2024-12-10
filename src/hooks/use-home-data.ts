import { SuccessResponse } from "@/api/api";

import { fetcher } from "@/api/fetcher";
import { HomeProjectResponse, HomeStatusResponse } from "@/api/home";
import useSWRImmutable from "swr/immutable";

//CustomAreaChart
export function useHomeProject(search?: Record<string, any>) {
  const params = new URLSearchParams(search as Record<string, string>);

  const {
    data: response,
    isValidating: isLoading,
    mutate,
  } = useSWRImmutable<SuccessResponse<HomeProjectResponse[]>>(
    params ? `/dashboard/tusultoo/saraar?${params}` : null,
    fetcher
  );

  return {
    data: response?.data || [],
    isLoading,
    mutate,
  };
}

//PieChart - type
export function useHomeProjectStatus(search?: Record<string, any>) {
  const params = new URLSearchParams(search as Record<string, string>);

  const {
    data: response,
    isValidating: isLoading,
    mutate,
  } = useSWRImmutable<SuccessResponse<HomeStatusResponse[]>>(
    params ? `/dashboard/tusultuluvtoo?${params}` : null,
    fetcher
  );

  return {
    data: response?.data || [],
    isLoading,
    mutate,
  };
}

export function useHomeSumStatus(search?: Record<string, any>) {
  const params = new URLSearchParams(search as Record<string, string>);

  const {
    data: response,
    isValidating: isLoading,
    mutate,
  } = useSWRImmutable<SuccessResponse<HomeStatusResponse[]>>(
    params ? `/dashboard/status?${params}` : null,
    fetcher
  );

  return {
    data: response?.data || [],
    isLoading,
    mutate,
  };
}
