import { fetcher } from "../api/fetcher";

import { DefaultPagination, PaginationResponse } from "@/constants";
import useSWRImmutable from "swr/immutable";
import { generateParams } from "@/utils/pagination-search";
import { ProjectResponse } from "@/api/information/projects";


export function useProject(
  pagination?: DefaultPagination,
  search?: {
    garchig?: string;
    sort_by: string;
    sort_type: string;
    begin_date?: string;
    end_date?: string;
  }
) {
  const params = generateParams(pagination, search);

  const { data, isLoading, error, mutate } = useSWRImmutable(
    `/tusul/?${params}`,
    (url) => fetcher<PaginationResponse<ProjectResponse>>(url)
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

export function useProjectById(id: number) {
  const { data, isLoading, mutate, error } = useSWRImmutable(
    getProjectById(id),
    (url) => fetcher<ProjectResponse>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return { data: undefined, isLoading, mutate };
}

export function getProjectById(id: number | undefined) {
  return `/tusul/get/${id}`;
}

