import { SuccessResponse } from "@/api/api";
import { SuccessClassResponse, SuccessTypeResponse } from "@/api/dashboard/success";

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
export function useSuccessType(search?: Record<string, any>) {
  const params = new URLSearchParams(search as Record<string, string>);

  const {
    data: response,
    isValidating: isLoading,
    mutate,
  } = useSWRImmutable<SuccessResponse<SuccessTypeResponse[]>>(
    params ? `/dashboard/angilaltoo?${params}` : null,
    fetcher
  );

  return {
    data: response?.data || [],
    isLoading,
    mutate,
  };
}

export function useSuccessClass(search?: Record<string, any>) {
  const params = new URLSearchParams(search as Record<string, string>);

  const {
    data: response,
    isValidating: isLoading,
    mutate,
  } = useSWRImmutable<SuccessResponse<SuccessClassResponse[]>>(
    params ? `/dashboard/turultoo?${params}` : null,
    fetcher
  );

  return {
    data: response?.data || [],
    isLoading,
    mutate,
  };
}


//PieChart - type
export function useNewType(search?: Record<string, any>) {
  const params = new URLSearchParams(search as Record<string, string>);

  const {
    data: response,
    isValidating: isLoading,
    mutate,
  } = useSWRImmutable<SuccessResponse<SuccessTypeResponse[]>>(
    params ? `/dashboard/newproject/angilaltoo?${params}` : null,
    fetcher
  );

  return {
    data: response?.data || [],
    isLoading,
    mutate,
  };
}

export function useNewClass(search?: Record<string, any>) {
  const params = new URLSearchParams(search as Record<string, string>);

  const {
    data: response,
    isValidating: isLoading,
    mutate,
  } = useSWRImmutable<SuccessResponse<SuccessClassResponse[]>>(
    params ? `/dashboard/newproject/turultoo?${params}` : null,
    fetcher
  );

  return {
    data: response?.data || [],
    isLoading,
    mutate,
  };
}
