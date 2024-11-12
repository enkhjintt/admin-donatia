import { fetcher } from "../api/fetcher";

import { DefaultPagination, PaginationResponse } from "@/constants";
import useSWRImmutable from "swr/immutable";
import { generateParams } from "@/utils/pagination-search";
import { ProjectFeeResponse } from "@/api/ref/project-fee";

export function useProjectFee(
  pagination?: DefaultPagination,
  search?: {
    //end haih col zarlana
    honog?: string;
    sort_by: string;
    sort_type: string;
    begin_date?: string;
    end_date?: string;
  }
) {
  const params = generateParams(pagination, search);

  const { data, isLoading, error, mutate } = useSWRImmutable(
    `/tusul/huraamj/?${params}`,
    (url) => fetcher<PaginationResponse<ProjectFeeResponse>>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return {
    data: undefined,
    isLoading,
    mutate,
  };
}

export function useProjectFeeById(id: number) {
  const { data, isLoading, mutate, error } = useSWRImmutable(
    getProjectFeeById(id),
    (url) => fetcher<ProjectFeeResponse>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return { data: undefined, isLoading, mutate };
}

export function getProjectFeeById(id: number | undefined) {
  return `/tusul/huraamj/get/${id}`;
}
