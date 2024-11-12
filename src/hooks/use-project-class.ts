import { fetcher } from "../api/fetcher";

import { DefaultPagination, PaginationResponse } from "@/constants";
import useSWRImmutable from "swr/immutable";
import { generateParams } from "@/utils/pagination-search";
import { ProjectClassResponse } from "@/api/ref/project-class";

export function useProjectClass(
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
    `/tusul/angilal/?${params}`,
    (url) => fetcher<PaginationResponse<ProjectClassResponse>>(url)
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

export function useProjectClassById(id: number) {
  const { data, isLoading, mutate, error } = useSWRImmutable(
    getProjectClassById(id),
    (url) => fetcher<ProjectClassResponse>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return { data: undefined, isLoading, mutate };
}

export function getProjectClassById(id: number | undefined) {
  return `/tusul/angilal/get/${id}`;
}
