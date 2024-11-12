import { fetcher } from "../api/fetcher";

import { DefaultPagination, PaginationResponse } from "@/constants";
import useSWRImmutable from "swr/immutable";
import { generateParams } from "@/utils/pagination-search";
import { ProjectTypeResponse } from "@/api/ref/project-type";

export function useProjectType(
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
    `/tusul/turul/?${params}`,
    (url) => fetcher<PaginationResponse<ProjectTypeResponse>>(url)
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

export function useProjectTypeById(id: number) {
  const { data, isLoading, mutate, error } = useSWRImmutable(
    getProjectTypeById(id),
    (url) => fetcher<ProjectTypeResponse>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return { data: undefined, isLoading, mutate };
}

export function getProjectTypeById(id: number | undefined) {
  return `/tusul/turul/get/${id}`;
}
