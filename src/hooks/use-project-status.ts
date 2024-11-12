import { fetcher } from "../api/fetcher";

import { DefaultPagination, PaginationResponse } from "@/constants";
import useSWRImmutable from "swr/immutable";
import { generateParams } from "@/utils/pagination-search";
import { ProjectStatusResponse } from "@/api/ref/project-status";


export function useProjectStatus(
  pagination?: DefaultPagination,
  search?: {
    //end haih col zarlana
    ner?: string;
    sort_by: string;
    sort_type: string;
    begin_date?: string;
    end_date?: string;
  }
) {
  const params = generateParams(pagination, search);

  const { data, isLoading, error, mutate } = useSWRImmutable(
    `/tusul/tuluv/?${params}`,
    (url) => fetcher<PaginationResponse<ProjectStatusResponse>>(url)
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

export function useProjectStatusById(id: number) {
  const { data, isLoading, mutate, error } = useSWRImmutable(
    getProjectStatusById(id),
    (url) => fetcher<ProjectStatusResponse>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return { data: undefined, isLoading, mutate };
}

export function getProjectStatusById(id: number | undefined) {
  return `/tusul/tuluv/get/${id}`;
}
